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
 * 提供者装饰器参数
 */
export type ProviderParams = ReflectComponentMetaData

/**
 * 消费者装饰器参数
 */
export type ConsumerParams = ReflectComponentMetaData

/**
 * ReactBoot启动类的配置
 */
export type ReactBootConfig = {
    /** React对象 类型为(typeof React) */
    react: object

    /** 应用名称 */
    name: Key

    /** 应用描述 */
    description: string

    /** 应用模块加载完成的回调 */
    onload?: () => void
}

/**
 * ReactBoot启动类参数
 */
export type ReactBootParams = ReactBootConfig & ApplicationParams

/**
 * ReactBoot启动函数返回类型
 */
export type ReactBootReturns = {
    /** 创建应用启动函数 */
    createApp: (options: ReactBootApplication & ApplicationParams) => ReactBootApplication | void

    /** 应用启动类装饰器 */
    Application: (target?: ReactBootConstructor | ApplicationParams | undefined) => any

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
export type ScanModules = Modules | Promise<{ readonly default: Modules }>

/**
 * 应用启动类装饰器参数
 */
export type ApplicationParams = {
    /**
     * 扫描的模块
     */
    modules?: ScanModules
}
