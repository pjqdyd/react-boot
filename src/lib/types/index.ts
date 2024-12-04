import type { App, ReactBootApplication, ReflectComponentMetaData } from '../interface'

/**
 * 类装饰器修饰的类型
 */
export type Constructor<T = any> = new (...args: any[]) => T

/**
 * 装饰器修饰的启动类类型
 */
export type ReactBootConstructor = Constructor<ReactBootApplication>

/**
 * 提供者装饰器修饰的类型
 */
export type ProviderConstructor = Constructor

/**
 * 属性装饰器修饰的值属性
 */
export type Descriptor = PropertyDescriptor & { initializer?: () => never }

/**
 * key 类型
 */
export type Key = string | symbol

/**
 * 应用IOC容器类型
 */
export type IocMap = Map<Key, App>

/**
 * 日志类型
 */
export type LogType = 'log' | 'warn' | 'error'

/**
 * 日志类型 (包含系统日志)
 */
export type LogTypes = LogType | 'system'

/**
 * 日志配置类型
 */
export type LogConfig = {
    level: number
    style: string
    bgColor: string
}

/**
 * 提供者装饰器参数
 */
export type ProviderParams = ReflectComponentMetaData

/**
 * 消费者装饰器参数
 */
export type ConsumerParams = ReflectComponentMetaData

/**
 * 模块类型
 */
export type Module = { readonly default: any }

/**
 * 异步模块类型
 */
export type AsyncModule = () => Promise<Module>

/**
 * 依赖注入的模块集合类型
 */
export type Modules = {
    /** key-模块名称, value-模块对象/异步模块函数 */
    [key: string]: Module | AsyncModule
}

/**
 * 扫描的模块类型
 */
export type ScanModules = Modules | Promise<{ readonly default: Modules }> | undefined

/**
 * 应用启动类装饰器参数
 */
export type ApplicationParams = {
    /**
     * 扫描的模块
     */
    modules?: ScanModules
}

/**
 * App参数类型
 */
export type AppParams = App & ApplicationParams

/**
 * App选项类型
 */
export type AppOptions = ReactBootApplication & ApplicationParams

/**
 * Application 修饰目标参数类型
 */
export type ApplicationTarget = ReactBootConstructor | ApplicationParams | undefined

/**
 * ReactBoot启动函数返回类型
 */
export type ReactBootReturns = {
    /** 创建应用启动函数 */
    createApp: (options: AppOptions) => ReactBootApplication | void

    /** 应用启动类装饰器 */
    Application: (target?: ApplicationTarget) => any

    /** 销毁应用函数 */
    destroyApp: () => void

    /** 提供者装饰器 */
    Provider: (params: ProviderParams) => (target?: ProviderConstructor) => void

    /** 消费者装饰器 */
    Consumer: (params: ConsumerParams) => (target: any, propertyKey: string, descriptor: Descriptor) => Descriptor

    /** 提供者hooks */
    withProvider: <T>(params: ProviderParams) => (target: T) => T

    /** 消费者hooks */
    useConsumer: <T>(params: ConsumerParams) => T[]
}
