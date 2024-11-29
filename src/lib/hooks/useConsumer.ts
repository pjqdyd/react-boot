import { getComponent, log } from '../core'
import type { ConsumerParams, ReactBootConfig } from '../types'
import type { Component } from '../interface'

/**
 * Consumer 组件消费属性装饰器
 * @param config
 * @param consumerParams
 */
const useConsumer = <T>(config: ReactBootConfig, consumerParams: ConsumerParams) => {
    const { react } = config || {}
    const { name } = consumerParams || {}
    if (!name) {
        log('useConsumer params name is required', 'warn')
        return [null as T]
    }
    if (!react) {
        log('useConsumer depends on the React function component，You should set the react parameters', 'error')
        return [null as T]
    }
    const comp = react.useRef<Component>()
    if (!comp.current) {
        comp.current = getComponent(config, consumerParams)
    }
    return [comp.current?.component as T]
}

export default useConsumer
