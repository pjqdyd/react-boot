import { App } from '../interface'
import { getComponent } from '../core'
import type { Descriptor } from '../types'

/**
 * Consumer 组件消费属性装饰器
 * @param appParams
 * @param params
 */
const Consumer = (appParams: App, params: any) => {
    return (target: any, propertyKey: string, descriptor: Descriptor) => {
        let value = descriptor.value ?? descriptor.initializer?.()
        const newDescriptor = {
            get() {
                const component = getComponent(appParams, params)
                if (component?.component) {
                    value = component.component
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
