import type { ComponentType } from 'react'
import type { Key } from '../types'

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

    /** 组件描述信息 */
    readonly description?: string

    /** 组件类名 */
    className?: string

    /** 组件 */
    component: ComponentType | undefined

    /** 版本组件Map */
    versions: Map<Key, Component>
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

    /** 应用类名 */
    className?: string

    /** 组件集合 */
    components?: Map<Key, Component>
}

/**
 * 反射修饰组件元数据
 */
export interface ReflectComponentMetaData {
    /** 组件名称 */
    name: Key

    /** 组件描述信息 */
    description?: string

    /** 是否异步组件 */
    async?: boolean

    /** 组件类名 */
    className?: string
}
