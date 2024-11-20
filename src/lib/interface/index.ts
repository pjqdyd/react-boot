import type { Key, ProviderConstructor } from '../types'

/**
 * 启动类的接口
 */
export interface ReactBootApplication {
    /**
     * 启动方法
     */
    run: () => void

    /**
     * 销毁方法
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

    /** 组件 */
    readonly component: ProviderConstructor | undefined
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
