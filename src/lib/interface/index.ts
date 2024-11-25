import type { Key, Module, ProviderConstructor } from '../types'

/**
 * 启动类的接口
 */
export interface ReactBootApplication {
    /**
     * 启动方法
     */
    run: () => void

    /**
     * 销毁方法,暴露给应用自行调用
     * 执行此方法后, App及其组件会从IOC容器中移除
     */
    destroy?: () => void
}

/**
 * 组件类的接口
 */
export interface Component {
    /** 组件名称 */
    readonly name: Key

    /** 组件的版本 */
    readonly version?: Key

    /** 组件描述信息 */
    readonly description?: string

    /** 是否异步组件 */
    readonly isAsync?: boolean

    /** 实际组件 */
    readonly component: ProviderConstructor | (() => Promise<Module>) | undefined
}

/**
 * App类的接口
 */
export interface App {
    /** 应用名称 */
    readonly name: Key

    /** 应用描述信息 */
    readonly description?: string

    /** 启动应用实例 */
    reactBoot?: ReactBootApplication

    /** 启动应用应用类名 */
    className?: string

    /** 组件集合 组件名-版本号 => 组件对象 */
    components?: Map<Key, Map<Key, Component>>
}

/**
 * 反射修饰组件元数据
 */
export interface ReflectComponentMetaData {
    /** 组件名称 */
    readonly name: Key

    /** 组件版本 */
    readonly version?: Key

    /** 组件描述信息 */
    readonly description?: string
}

/**
 *  异步模块
 */
export interface AsyncModule extends ReflectComponentMetaData {
    /** 是否异步 */
    isAsync: boolean

    /** 异步模块 */
    module: () => Promise<Module>
}

/**
 * 异步模块集合类型
 */
export interface AsyncModules {
    [key: string]: AsyncModule
}

/**
 * 异步模块配置
 */
export interface AsyncModuleOption extends ReflectComponentMetaData {
    /** 异步模块 */
    module: {
        [key: string]: () => Promise<Module>
    }
}
