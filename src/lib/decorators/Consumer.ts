import ReactBootError from '../exception'
import { getComponent } from '../core'
import type { ConsumerParams, Descriptor, ReactBootConfig } from '../types'
import type { Component } from '../interface'

/**
 * Consumer 组件消费属性装饰器
 * @param appParams
 * @param consumerParams
 */
const Consumer = (appParams: ReactBootConfig, consumerParams: ConsumerParams) => {
    const { name } = consumerParams
    return (target: any, propertyKey: string, descriptor: Descriptor) => {
        if (!name) {
            throw new ReactBootError('@Consumer params name is required')
        }
        if (!propertyKey || !descriptor) {
            throw new ReactBootError('@Consumer must be used on class properties')
        }
        let value = descriptor.value ?? descriptor.initializer?.call?.(target)
        let comp: Component | undefined
        const newDescriptor = {
            get() {
                // 获取组件实例
                if (!comp) {
                    comp = getComponent(appParams, consumerParams)
                }
                value = comp?.component || value
                return value
            },
            set(newValue: any) {
                value = newValue
            },
            enumerable: true,
            configurable: true,
        }
        Object.defineProperty(target, propertyKey, newDescriptor)
        return newDescriptor
    }
}

export default Consumer
