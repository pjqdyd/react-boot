import ReactBoot from '../interface/ReactBoot'

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
}

/**
 * 应用参数
 */
export type AppParams = {
    /** 应用名称 */
    name?: string

    /** 应用实例 */
    app?: ReactBoot

    /** 应用类名 */
    className?: string

    /** 应用类属性 */
    descriptor?: PropertyDescriptor
}
