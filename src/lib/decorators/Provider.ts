import { registerComponent, log, REFLECT_COMPONENT_KEY } from '../core'
import ReactBootError from '../exception'
import type { ApplicationParams, ComponentConstructor } from '../types'

/**
 * Provider 组件提供装饰器
 * @param appParams
 * @param params
 */
const Provider = (appParams: ApplicationParams, params: any) => {
    const { name, asyncComponent } = params
    return (target?: ComponentConstructor, className?: string, descriptor?: PropertyDescriptor) => {
        if (!target || typeof target !== 'function') {
            throw new ReactBootError('@Provider target must be a class')
        }
        Reflect.defineMetadata(REFLECT_COMPONENT_KEY, { name }, target)
        console.log('Provider: ', Object.prototype.toString.call(target), target, className, descriptor, asyncComponent)
        registerComponent(appParams, {
            name: name,
            component: target,
        })
        log(`[${name}] Component register success`)
    }
}

export default Provider
