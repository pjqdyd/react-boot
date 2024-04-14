import { AppParams } from '../types'
import ReactBootError from '../exception'

/**
 * 版本号
 */
export const version = '1.0.4'

/**
 * 导出根对象
 */
export const root: any = window || globalThis || global || self || {}

/**
 * 应用Key
 */
export const key = Symbol('ReactBoot')

/**
 * 应用IOC容器类型
 */
type IocMap = Map<string, Map<string, Map<string, any>>>

/**
 * 自执行初始化应用IOC容器
 */
export const ioc = (() => {
    if (!root[key]) root[key] = new Map() as IocMap
    return root[key]
})() as IocMap

/**
 * 添加应用到IOC容器
 * @param params
 */
export const createApp = (params: AppParams) => {
    const { name } = params
    if (!name) {
        throw new ReactBootError('@Application App name is required')
    }
    if (ioc.has(name)) {
        throw new ReactBootError(`@Application App name is must be unique`)
    }
    if (!ioc.has(name)) ioc.set(name, new Map())
    return ioc.get(name)
}

/**
 * 从IOC容器删除应用
 * @param params
 */
export const removeApp = (params: AppParams) => {
    const { name } = params
    if (!name) {
        throw new ReactBootError('@Application App name is required')
    }
    return ioc.delete(name)
}
