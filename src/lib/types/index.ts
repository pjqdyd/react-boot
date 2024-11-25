import { App, type AsyncModule, ReactBootApplication, ReflectComponentMetaData } from '../interface'

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
    /** 应用名称 */
    name: Key

    /** 应用描述 */
    description: string

    /** 应用模块加载完成的回调 */
    onLoad?: () => void
}

/**
 * ReactBoot启动类参数
 */
export type ReactBootParams = ReactBootConfig & ApplicationParams

/**
 * 模块类型
 */
export type Module = { readonly default: any }

/**
 * 依赖的模块集合类型
 */
export type Modules = {
    /** key-模块名称, value-模块对象/异步模块对象 */
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
