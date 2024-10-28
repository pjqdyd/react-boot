import type { ReactBootApplication, App } from '../interface'

/**
 * 启动类类型
 */
export type ReactBootClass = new (...args: any[]) => ReactBootApplication

/**
 * 应用启动类装饰器参数
 */
export type ApplicationParams = {
    /** 应用名称 */
    name: string | symbol

    /** 应用描述 */
    description: string
}

/**
 * 应用IOC容器类型
 */
export type IocMap = Map<string | symbol, App>
