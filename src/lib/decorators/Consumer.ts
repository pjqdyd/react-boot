import { App } from '../interface'
import { syncGetComponent } from '../core'

/**
 * Consumer 组件消费属性装饰器
 * @param appParams
 * @param params
 */
const Consumer = (appParams: App, params: any) => {
    const { name } = params
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const component = syncGetComponent(appParams, params)
        let value = component.component || descriptor.value
        Object.defineProperty(target, propertyKey, {
            get() {
                return value
            },
            set(newValue) {
                value = newValue
            },
            enumerable: true,
            configurable: true,
        })
    }
}

export default Consumer
