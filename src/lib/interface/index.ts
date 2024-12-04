import type { Key, LogType } from '../types'

/**
 * ReactBoot配置
 */
export interface ReactBootConfig {
    /** React对象 类型为(typeof React) */
    react: object

    /** 应用名称 */
    name: Key

    /** 应用描述 */
    description: string

    /** 应用日志级别, 默认 log */
    logLevel?: LogType

    /** 应用模块加载完成的回调 */
    onload?: () => void
}

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
 * App类的接口
 */
export interface App {
    /** 应用名称 */
    name: Key

    /** 应用描述信息 */
    description?: string

    /** 启动应用实例 */
    reactBoot?: ReactBootApplication

    /** 应用模块加载器 */
    modulesLoader?: Generator<Promise<void>, void>

    /** 组件集合 组件名-版本号 => 组件对象 */
    components?: Map<Key, Map<Key, Component>>

    /** 应用日志级别 */
    logLevel: LogType

    /** 应用日志输出 */
    logger: (message: string, type?: LogType) => void
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
    readonly component: any
}

/**
 * 反射修饰组件元数据
 */
export interface ReflectComponentMetaData {
    /** 组件名称 */
    readonly name: Key

    /** 组件版本 */
    readonly version?: Key

    /** 是否异步组件 */
    readonly isAsync?: boolean

    /** 组件描述信息 */
    readonly description?: string
}
