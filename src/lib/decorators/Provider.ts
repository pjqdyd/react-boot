import { registerComponent, log } from '../core'
import { ApplicationParams, ComponentClass } from '../types'

/**
 * Provider 组件提供装饰器
 * @param appParams
 * @param params
 */
const Provider = (appParams: ApplicationParams, params: any) => {
    const { name, asyncComponent } = params
    return (target?: ComponentClass, className?: string, descriptor?: PropertyDescriptor) => {
        // const home = import(params.path).then((module) => {
        //     console.log('module:', module)
        // })
        console.log('Provider: ', target, className, descriptor)
        console.log('asyncComponent: ', asyncComponent)
        setTimeout(() => {
            asyncComponent.then((module: any) => {
                console.log('module:', module)
            })
        }, 5000)
        registerComponent(appParams, {
            name: name,
            component: target,
        })
        log(`[${name}] Component register success`)
    }
}

export default Provider
