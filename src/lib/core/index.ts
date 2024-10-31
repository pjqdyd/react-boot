import AppClass from '../core/App'
import Component from '../core/Component'
import ReactBootError from '../exception'
import { ApplicationParams, IocMap, GlobalState, Module, ReactBootConfig } from '../types'
import type { App } from '../interface'

/**
 * 版本号
 */
export const version = '1.0.4'

/**
 * 应用Key
 */
export const key = Symbol('ReactBoot')

/**
 * 导出根对象
 */
export const root: any = window || globalThis || global || self || {}

/**
 * 反射元数据修饰组件的key
 */
export const REFLECT_COMPONENT_KEY = 'REFLECT_COMPONENT_KEY'

/**
 * 打印日志
 * @param msg
 * @param type
 */
export const log = (msg: string, type: 'log' | 'warn' | 'error' = 'log') => {
    console[type]?.(`ReactBoot ${version}: `, msg)
}

/**
 * 自执行初始化应用IOC容器
 */
export const ioc = (() => {
    if (!root[key]) {
        root[key] = new Map()
    }
    return root[key]
})() as IocMap

/**
 * 全局状态机制
 */
const globalState: GlobalState = {
    /** 加载状态 */
    loadState: 'init',
}
export const updateLoadState = (state: GlobalState['loadState']) => {
    globalState.loadState = state
}

/**
 * 注册应用到IOC容器
 * @param params
 */
export const registerApp = (params: ApplicationParams) => {
    updateLoadState('registerApp')
    try {
        const { name } = params
        if (!name) {
            throw new ReactBootError('App name is required')
        }
        if (ioc.has(name)) {
            throw new ReactBootError(`App name is must be unique`)
        }
        const app = new AppClass(params)
        // 注册创建的应用
        ioc.set(name, app)
        // 打印日志
        log(`[${name.toString()}] Application register success`)
        return app
    } catch (e) {
        updateLoadState('done')
        log(`App register Fail: ${e}`, 'error')
    }
}

/**
 * 加载并注入模块
 * @param config
 */
export const loadModules = (config: ReactBootConfig) => {
    updateLoadState('registerModules')
    try {
        const { modules } = config
        if (!modules) {
            throw new ReactBootError('Config modules is required')
        }
        if (!modules.then) {
            throw new ReactBootError('Config modules must be Promise (you should use import())')
        }
        modules
            .then(async (mods) => {
                const modsMap = mods.default || mods
                Object.keys(modsMap).forEach((path) => {
                    const mod = modsMap[path]
                    const modType = Object.prototype.toString.call(mod)
                    if (modType === '[object Module]') {
                        // 同步引入模块
                        const component = (mod as Module).default
                        const metaData = Reflect.getMetadata(REFLECT_COMPONENT_KEY, component)
                        console.log('metaData', metaData)
                        registerComponent(config as ApplicationParams, {
                            name: metaData.name,
                            component: component,
                        })
                        log(`[${metaData.name}] Component register success`)
                    }
                    if (modType === '[object Function]') {
                        console.log('async mod', mod)
                        // 异步引入的模块
                        // mod().then((mod) => {
                        //     const component = mod.default
                        //     const metaData = Reflect.getMetadata(REFLECT_COMPONENT_KEY, component)
                        //     console.log('metaData2', metaData)
                        // })
                    }
                })
                // 触发加载完成事件
                config.onLoad?.()
            })
            .catch((e) => {
                log(`Modules load Fail: ${e}`, 'error')
            })
            .finally(() => {
                updateLoadState('done')
            })
    } catch (e) {
        updateLoadState('done')
        log(`Modules load Fail: ${e}`, 'error')
    }
}

/**
 * 绑定应用启动类
 * @param params
 */
export const bindReactBoot = (params: App) => {
    const { reactBoot, className } = params
    const app = getApp(params)
    if (!app) {
        throw new ReactBootError(`[${params.name.toString()}] bind App is not found`)
    }
    if (!reactBoot) {
        throw new ReactBootError('bindApp reactBoot is required')
    }
    // 绑定启动类
    app.reactBoot = reactBoot
    app.className = className
    // 绑定销毁事件
    const destroy = reactBoot.destroy?.bind(this)
    reactBoot.destroy = () => {
        destroy?.()
        removeApp(params)
        log(`[${params.name.toString()}] Application destroy success`)
    }
}

/**
 * 获取IOC中的应用
 * @param params
 */
export const getApp = (params: Partial<App>) => {
    const { name } = params
    if (!name) {
        throw new ReactBootError('App name is required')
    }
    if (!ioc.has(name)) {
        log(`[${name.toString()}] App is not found`, 'warn')
        return null
    }
    return ioc.get(name)
}

/**
 * 从IOC容器删除应用
 * @param params
 */
export const removeApp = (params: Partial<App>) => {
    const { name } = params
    if (!name) {
        throw new ReactBootError('App name is required')
    }
    return ioc.delete(name)
}

/**
 * 注册组件到IOC容器
 * @param appParams
 * @param params
 */
export const registerComponent = (appParams: Partial<App>, params: any) => {
    const { name: appName } = appParams
    const { name: compName } = params
    if (!appName) {
        throw new ReactBootError('App name is required')
    }
    // 获取应用
    const app = ioc.get(appName)
    if (!app) {
        throw new ReactBootError(`[${appName.toString()}] App is not found`)
    }
    // 如果组件已经存在
    if (app?.components?.has(compName)) {
        throw new ReactBootError(`[${compName}] Component name is must be unique`)
    }
    // 创建组件
    const component = new Component({
        name: compName,
        component: params.component,
        versions: new Map(),
    })
    // 注册组件
    app?.components?.set(compName, component)

    return component
}

/**
 * 获取IOC中的组件
 * @param params
 */
export function getComponent(appParams: Partial<App>, params: any) {
    const { name: appName } = appParams
    const { name: compName } = params
    const app = getApp(appParams)
    if (!app) {
        throw new ReactBootError(`[${appName?.toString()}] App is not found`)
    }
    const component = app?.components?.get(compName)
    if (!component) {
        throw new ReactBootError(`[${appName?.toString()}]-[${compName}] Component is not found`)
    }
    return component
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 同步获取组件
 * @param appParams
 * @param params
 */
export const syncGetComponent = (appParams: Partial<App>, params: any) => {
    // 使用示例 TODO
    (async () => {
        await sleep(2000)
        console.log('2秒后执行')
    })()
    console.log('获取组件')
    return getComponent(appParams, params)
}
