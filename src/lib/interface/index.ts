import type { ComponentType } from 'react'

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
    name: string

    /** 组件类名 */
    className?: string

    /** 组件描述信息 */
    description?: string

    /** 组件 */
    component: ComponentType | undefined

    /** 版本组件Map */
    versions: Map<string, Component>
}

/**
 * App类的接口
 */
export interface App {
    /** 应用名称 */
    name: string | symbol

    /** 启动应用实例 */
    reactBoot?: ReactBootApplication

    /** 应用类名 */
    className?: string

    /** 应用描述信息 */
    description?: string

    /** 组件集合 */
    components?: Map<string, Component>
}
