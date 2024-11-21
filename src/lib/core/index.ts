import AppClass from '../core/App'
import Component from '../core/Component'
import ReactBootError from '../exception'
import { ApplicationParams, ConsumerParams, IocMap, Module, ReactBootConfig } from '../types'
import type { App, ReflectComponentMetaData } from '../interface'

/**
 * ReactBoot版本号
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
 * 默认组件版本号
 */
export const DEFAULT_COMPONENT_VERSION = Symbol('default')

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
 * 注册应用到IOC容器
 * @param appParams
 */
export const registerApp = (params: ApplicationParams) => {
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
        log(`[${String(name)}] Application register success`)
        return app
    } catch (e) {
        log(`App register Fail: ${e}`, 'error')
    }
}

/**
 * 加载并注入模块
 * @param config
 */
export const loadModules = async (config: ReactBootConfig) => {
    try {
        const { modules } = config
        if (!modules) {
            throw new ReactBootError('Config modules is required')
        }
        if (!modules.then) {
            throw new ReactBootError('Config modules must be Promise (you should use import())')
        }

        // 加载所有模块
        const mods = await modules

        const modsMap = mods.default || mods

        const syncMods: Array<Module> = []
        const asyncMods: Array<() => Promise<Module>> = []

        Object.keys(modsMap).forEach((path) => {
            const mod = modsMap[path]
            const modType = Object.prototype.toString.call(mod)
            if (modType === '[object Module]') {
                syncMods.push(mod as Module)
            }
            if (modType === '[object Function]') {
                asyncMods.push(mod as () => Promise<Module>)
                // 异步引入的模块
                // mod().then((mod) => {
                //     const component = mod.default
                //     const metaData = Reflect.getMetadata(REFLECT_COMPONENT_KEY, component)
                //     console.log('metaData2', metaData)
                // })
            }
        })
        // 同步引入模块
        syncMods.forEach((mod) => {
            const component = (mod as Module).default
            const metaData: ReflectComponentMetaData = Reflect.getMetadata(REFLECT_COMPONENT_KEY, component)
            // 注册Provider修饰的组件
            if (metaData) {
                registerComponent(config as ApplicationParams, {
                    name: metaData.name,
                    version: metaData.version,
                    description: metaData.description,
                    component: component,
                })
            }
        })
    } catch (e) {
        log(`Modules load Fail: ${e}`, 'error')
    }
}

/**
 * 绑定应用启动类
 * @param params
 */
export const bindReactBoot = (params: App) => {
    const { reactBoot, name, className } = params
    try {
        const app = getApp(params)
        if (!app) {
            throw new ReactBootError(`[${String(name)}] bind App is not found`)
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
            log(`[${String(name)}] Application destroy success`)
        }
        log(`[${String(name)}] App ReactBoot bind success`)
    } catch (e) {
        log(`[${String(name)}] App ReactBoot bind Fail: ${e}`, 'error')
    }
}

/**
 * 运行应用启动类run方法
 * @param params
 */
export const startReactBoot = (params: App) => {
    const { name } = params
    try {
        const app = getApp(params)
        // 获取启动类实例
        const reactBoot = app?.reactBoot
        if (!app || !reactBoot) {
            throw new ReactBootError(`[${String(name)}] reactBoot is not found`)
        }
        // 运行启动方法
        reactBoot.run?.()

        log(`[${String(name)}] App ReactBoot run success`)
    } catch (e) {
        log(`[${String(name)}] App ReactBoot run Fail: ${e}`, 'error')
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
        log(`[${String(name)}] App is not found`, 'warn')
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
 * @param componentParams
 */
export const registerComponent = (appParams: Partial<App>, componentParams: Component) => {
    const { name: appName } = appParams
    const { name: compName, version = DEFAULT_COMPONENT_VERSION, component, description } = componentParams
    const title = `[${String(appName)}]-[${String(compName)} ${String(version)}]`
    try {
        if (!appName) {
            throw new ReactBootError('App name is required')
        }
        // 获取应用
        const app = ioc.get(appName)
        if (!app) {
            throw new ReactBootError(`[${String(appName)}] App is not found`)
        }
        // 如果组件名称或版本为空
        if (!compName || !version) {
            throw new ReactBootError(`${title} Component name、version is required`)
        }
        const comp = app.components?.get(compName)
        // 如果该版本组件已经存在
        if (comp?.has(version)) {
            throw new ReactBootError(`${title} Component already exists`)
        }

        // 创建组件
        const componentInstance: Component = new Component({
            name: compName,
            version: version,
            component: component,
            description: description,
        })

        // 存储组件实例
        if (!comp) {
            app.components?.set(compName, new Map([[version, componentInstance]]))
        } else {
            comp.set(version, componentInstance)
        }

        log(`${title} Component register success`)

        return componentInstance
    } catch (e) {
        log(`${title} Component register Fail: ${e}`, 'error')
    }
}

/**
 * 获取IOC中的组件实例
 * @param appParams
 * @param consumerParams
 */
export function getComponent(appParams: Partial<App>, consumerParams: ConsumerParams) {
    const { name: appName } = appParams
    const { name: compName, version = DEFAULT_COMPONENT_VERSION } = consumerParams
    const title = `[${String(appName)}]-[${String(compName)} ${String(version)}]`
    try {
        const app = getApp(appParams)
        if (!app) {
            throw new ReactBootError(`[${String(appName)}] App is not found`)
        }
        // 如果组件名称或版本为空
        if (!compName || !version) {
            throw new ReactBootError(`${title} Consumer Component name、version is required`)
        }
        // 获取组件
        const component = app.components?.get(compName)?.get(version)
        if (!component) {
            throw new ReactBootError(`${title} Component is not found`)
        }
        log(`${title} Component get success`)

        return component
    } catch (e) {
        log(`${title} Component get fail: ${e}`, 'error')
    }
}
