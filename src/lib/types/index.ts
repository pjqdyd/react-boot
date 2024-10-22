import type { ReactBoot, App } from '../interface'

/**
 * 启动类类型
 */
export type ReactBootClass = new (...args: any[]) => ReactBoot

/**
 * 应用启动类装饰器参数
 */
export type ApplicationParams = {
    /** 应用名称 */
    name: string

    /** 应用描述 */
    description: string
}

/**
 * 应用IOC容器类型
 */
// export type IocMap = Map<string, Map<string, Map<string, any>>>
export type IocMap = Map<string, App>
