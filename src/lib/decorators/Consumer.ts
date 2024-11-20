import { App } from '../interface'
import { getComponent } from '../core'
import type { ConsumerParams, Descriptor } from '../types'

/**
 * Consumer 组件消费属性装饰器
 * @param appParams
 * @param consumerParams
 */
const Consumer = (appParams: App, consumerParams: ConsumerParams) => {
    return (target: any, propertyKey: string, descriptor: Descriptor) => {
        let value = descriptor.value ?? descriptor.initializer?.call?.(target)
        const newDescriptor = {
            get() {
                // 获取组件实例
                const componentInstance = getComponent(appParams, consumerParams)
                if (componentInstance?.component) {
                    value = componentInstance.component
                }
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
