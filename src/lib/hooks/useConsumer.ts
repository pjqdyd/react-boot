import { getComponent, log } from '../core'
import type { ConsumerParams } from '../types'
import type { ReactBootConfig, App, Component } from '../interface'

/**
 * Consumer 组件消费hooks
 * @param app
 * @param config
 * @param consumerParams
 */
const useConsumer = <T>(app: App, consumerParams: ConsumerParams, config: ReactBootConfig) => {
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
        comp.current = getComponent(app, consumerParams)
    }
    return [comp.current?.component as T]
}

export default useConsumer
