import AppClass from '../core/App'
import Component from '../core/Component'
import ReactBootError from '../exception'
import type { ConsumerParams, IocMap, ReactBootConfig, ReactBootParams, Module, AsyncModule } from '../types'
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
export const REFLECT_COMPONENT_KEY = Symbol('reflect_component_key')

/**
 * 默认组件版本号
 */
export const DEFAULT_COMPONENT_VERSION = Symbol('default_component_version')

/**
 * 打印日志
 * @param msg
 * @param type
 */
const colors = {
    log: '#667EDE',
    warn: '#D9A557',
    error: '#EC4949',
}
export const log = (message: string, type: 'log' | 'warn' | 'error' = 'log') => {
    console[type]?.(
        `%c ReactBoot ${version}: `,
        `color: #ffffff; font-weight: bold; background: ${colors[type]};`,
        message,
    )
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
 * @param config
 */
export const registerApp = (config: ReactBootConfig) => {
    try {
        const { name } = config
        if (!name) {
            throw new ReactBootError('App name is required')
        }
        if (ioc.has(name)) {
            throw new ReactBootError(`App name is must be unique`)
        }
        const app = new AppClass(config)
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
 * 获取IOC中的应用
 * @param appParams
 */
export const getApp = (appParams: Partial<App>) => {
    const { name } = appParams
    if (!name) {
        throw new ReactBootError('App name is required')
    }
    const app = ioc.get(name)
    if (!app) {
        throw new ReactBootError(`[${String(name)}] App is not found`)
    }
    return app
}

/**
 * 从IOC容器删除应用
 * @param appParams
 */
export const removeApp = (appParams: Partial<App>) => {
    const { name } = appParams
    if (!name) {
        throw new ReactBootError('Remove app name is required')
    }
    return ioc.delete(name)
}

/**
 * 绑定应用启动类
 * @param appParams
 */
export const bindReactBoot = (appParams: App) => {
    const { reactBoot, name } = appParams
    try {
        const app = getApp(appParams)
        if (!reactBoot) {
            throw new ReactBootError(`[${String(name)}] bindApp reactBoot is required`)
        }
        // 绑定启动类
        app.reactBoot = reactBoot
        // 绑定销毁事件
        const destroy = reactBoot.destroy?.bind?.(this)
        reactBoot.destroy = () => {
            // 销毁方法
            destroy?.()
            // 移除应用
            removeApp(appParams)

            log(`[${String(name)}] Application destroy success`)
        }
        log(`[${String(name)}] App ReactBoot bind success`)
    } catch (e) {
        log(`[${String(name)}] App ReactBoot bind Fail: ${e}`, 'error')
    }
}

/**
 * 运行应用启动类run方法
 * @param appParams
 */
export const startReactBoot = (appParams: App) => {
    const { name } = appParams
    try {
        const app = getApp(appParams)
        // 获取启动类实例
        const reactBoot = app.reactBoot
        if (!reactBoot) {
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
 * 销毁应用方法
 * @param appParams
 */
export const destroyApp = (appParams: App) => {
    const { name } = appParams
    try {
        const app = getApp(appParams)
        // 获取启动类实例
        const reactBoot = app.reactBoot
        if (!reactBoot) {
            throw new ReactBootError(`[${String(name)}] destroy reactBoot is not found`)
        }
        // 运行销毁方法, 其中会从ioc中删除app
        reactBoot.destroy?.()

        log(`[${String(name)}] App ReactBoot destroy success`)
    } catch (e) {
        log(`[${String(name)}] App ReactBoot destroy Fail: ${e}`, 'error')
    }
}

/**
 * 注册组件到IOC容器
 * @param appParams
 * @param componentParams
 */
export const registerComponent = (appParams: Partial<App>, componentParams: Component) => {
    const { name: appName } = appParams
    const { name: compName, version = DEFAULT_COMPONENT_VERSION, isAsync, component, description } = componentParams
    const title = `[${String(appName)}] [${String(compName)} ${String(version)}] ${isAsync ? 'Async' : ''}`
    try {
        const app = getApp(appParams)
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
            isAsync: isAsync,
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
    const title = `[${String(appName)}] [${String(compName)} ${String(version)}]`
    try {
        const app = getApp(appParams)
        // 如果组件名称或版本为空
        if (!compName || !version) {
            throw new ReactBootError(`${title} Consumer Component name、version is required`)
        }
        // 获取组件实例
        const componentInstance = app.components?.get(compName)?.get(version)

        if (!componentInstance) {
            throw new ReactBootError(`${title} Component is not found`)
        }
        log(`${title} ${componentInstance.isAsync ? 'Async' : ''} Component get success`)

        return componentInstance
    } catch (e) {
        log(`${title} Component get fail: ${e}`, 'error')
    }
}

/**
 * bindModules 绑定模块加载器
 * 使用生成器模式，保证在未来某一时刻加载模块
 * 保证模块在应用注册后，应用启动前加载，避免阻塞，造成循环依赖
 * @param params
 */
function* modulesLoaderGenerator(params: ReactBootParams) {
    /**
     * 等待执行加载模块
     */
    yield execModulesLoad(params)
}
export const bindModules = (params: ReactBootParams) => {
    const { name } = params
    try {
        const app = getApp(params)
        // 绑定模块加载器
        app.modulesLoader = modulesLoaderGenerator(params)

        log(`[${String(name)}] Modules loader bind success`)
    } catch (e) {
        log(`[${String(name)}] Modules loader bind fail`, 'error')
    }
}

/**
 * 加载模块
 * @param params
 */
export const loadModules = (params: ReactBootParams) => {
    return new Promise<void>((resolve, reject) => {
        const { name } = params
        const start = new Date().getTime()
        /**
         * 使用生成器加载模块
         * 保证模块加载异步执行，避免阻塞，造成循环依赖
         */
        Promise.resolve().then(() => {
            const app = getApp(params)
            const loader = app.modulesLoader?.next?.()
            if (!loader || loader.done) {
                log(`[${String(name)}] Modules Loader is ${loader?.done ? 'done' : 'undefined'}`, 'warn')
                return resolve()
            }
            loader.value
                ?.then(() => {
                    const end = new Date().getTime()
                    log(`[${String(name)}] All modules load success, cost ${end - start} ms`)
                    resolve()
                })
                .catch((e) => reject(e))
        })
    })
}

/**
 * 执行模块加载
 * @param params
 */
export const execModulesLoad = async (params: ReactBootParams) => {
    try {
        const { modules, name } = params
        if (!modules) {
            const info = `Modules is not defined (please use @Application({ modules }) or createApp({ modules, ... })`
            log(`[${String(name)}] ${info}`, 'warn')
            return
        }
        // 加载引入的模块
        const mods = modules.then ? await modules : modules
        // 支持同步或异步引入的模块
        const modsMap = (mods as Module)?.default || mods
        Object.keys(modsMap)
            .filter((path) => Boolean(modsMap[path]))
            .forEach((path) => {
                const mod = modsMap[path]
                const modType = Object.prototype.toString.call(mod)
                let component = undefined
                // 同步引入的模块
                if (modType === '[object Module]') {
                    component = (mod as Module).default
                }
                // 异步引入的模块
                if (modType === '[object Function]') {
                    component = mod as AsyncModule
                }
                if (component) {
                    const metaData: ReflectComponentMetaData = Reflect.getMetadata(REFLECT_COMPONENT_KEY, component)
                    // 注册Provider修饰/withProvider包裹的组件
                    if (metaData) {
                        registerComponent(params, {
                            name: metaData.name,
                            version: metaData.version,
                            description: metaData.description,
                            isAsync: Boolean(metaData.isAsync),
                            component: component,
                        })
                    }
                }
            })
    } catch (e) {
        log(`Modules load Fail: ${e}`, 'error')
    }
}
