import { registerComponent, log } from '../core'
import { ApplicationParams } from '../types'

/**
 * Provider 组件提供装饰器
 * @param params
 */
const Provider = (appParams: ApplicationParams, params: any) => {
    const { name } = params
    return (target?: any, className?: string, descriptor?: PropertyDescriptor) => {
        // const home = import(params.path).then((module) => {
        //     console.log('module:', module)
        // })
        console.log('Provider: ', target, className, descriptor, params)
        registerComponent(appParams, {
            name: name,
            component: target,
        })
        log(`[${name}] Component register success`)
    }
}

export default Provider
