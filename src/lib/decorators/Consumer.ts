import ReactBootError from '../exception'
import { getComponent, log } from '../core'
import type { ConsumerParams, Descriptor } from '../types'
import type { App, Component } from '../interface'

/**
 * Consumer 组件消费属性装饰器
 * @param app
 * @param consumerParams
 */
const Consumer = (app: App, consumerParams: ConsumerParams) => {
    const { name } = consumerParams || {}
    return (target: any, propertyKey: string, descriptor: Descriptor) => {
        if (!propertyKey || !descriptor) {
            throw new ReactBootError('@Consumer must be used on class properties')
        }
        if (!name) {
            log('@Consumer params name is required', 'warn')
            return descriptor
        }
        let value = descriptor.value ?? descriptor.initializer?.call?.(target)
        let comp: Component | undefined
        const newDescriptor = {
            get() {
                // 获取组件实例
                if (!comp) {
                    comp = getComponent(app, consumerParams)
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
