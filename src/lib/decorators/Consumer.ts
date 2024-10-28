import { App } from '../interface'

/**
 * Provider 组件消费装饰器
 * @param appParams
 * @param params
 */
const Consumer = (appParams: App, params: any) => {
    const { name } = params
    return (target?: any, className?: string, descriptor?: PropertyDescriptor) => {
        console.log('xxxxx', target, className, descriptor)
    }
}

export default Consumer
