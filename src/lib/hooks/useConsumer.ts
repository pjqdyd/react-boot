import { getComponent, log } from '../core'
import type { ConsumerParams, ReactBootConfig } from '../types'
import type { Component } from '../interface'

/**
 * Consumer 组件消费hooks
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
        log('useConsumer depends on the React.useRef，You should config the react parameters', 'error')
        return [null as T]
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const comp = react.useRef<Component>()
    if (!comp.current) {
        comp.current = getComponent(config, consumerParams)
    }
    return [comp.current?.component as T]
}

export default useConsumer
