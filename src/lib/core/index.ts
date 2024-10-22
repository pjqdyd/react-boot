import AppClass from '../core/App'
import ReactBootError from '../exception'
import { IocMap } from '../types'
import { App } from '../interface'

/**
 * 版本号
 */
export const version = '1.0.4'

/**
 * 应用Key
 */
export const key = Symbol('ReactBoot')

/**
 * 导出根对象
 */
export const root: any = window || globalThis || global || self || {}

/**
 * 打印日志
 * @param msg
 * @param type
 */
export const log = (msg: string, type: 'log' | 'warn' | 'error' = 'log') => {
    console[type](`ReactBoot ${version}: `, msg)
}

/**
 * 自执行初始化应用IOC容器
 */
export const ioc = (() => {
    if (!root[key]) {
        root[key] = new Map()
    }
    return root[key]
})() as IocMap

/**
 * 注册应用到IOC容器
 * @param params
 */
export const registerApp = (params: App) => {
    const { name } = params
    if (!name) {
        throw new ReactBootError('@Application App name is required')
    }
    if (ioc.has(name)) {
        throw new ReactBootError(`@Application App name is must be unique`)
    }
    if (!ioc.has(name)) {
        ioc.set(name, new AppClass(params))
    }
    return ioc.get(name)
}

/**
 * 获取IOC中的应用
 * @param params
 */
export const getApp = (params: App) => {
    const { name } = params
    if (!ioc.has(name)) {
        log(`App ${name} is not found`, 'warn')
        return null
    }
    return ioc.get(name)
}

/**
 * 从IOC容器删除应用
 * @param params
 */
export const removeApp = (params: App) => {
    const { name } = params
    if (!name) {
        throw new ReactBootError('@Application App name is required')
    }
    return ioc.delete(name)
}
