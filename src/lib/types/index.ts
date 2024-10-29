import type { ReactBootApplication, App } from '../interface'
import type { ComponentClass } from 'react'

/**
 * 类装饰器修饰的类型
 */
export type Construct<T = any> = new (...args: any[]) => T

/**
 * 装饰器修饰的启动类类型
 */
export type ReactBootConstruct = Construct<ReactBootApplication>

/**
 * 装饰器修饰的组件类型
 */
export type ComponentConstruct = Construct<ComponentClass>

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
 * key 类型
 */
export type Key = string | number | symbol

/**
 * 应用IOC容器类型
 */
export type IocMap = Map<Key, App>
