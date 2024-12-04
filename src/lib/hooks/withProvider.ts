import { REFLECT_COMPONENT_KEY } from '../core'
import ReactBootError from '../exception'
import type { ProviderParams } from '../types'
import type { App, ReflectComponentMetaData } from '../interface'

/**
 * withProvider 组件提供hooks
 * @param app
 * @param providerParams
 */
const withProvider = <T>(app: App, providerParams: ProviderParams) => {
    const { name, version, isAsync, description } = providerParams || {}
    return (target: T) => {
        if (!name) {
            throw new ReactBootError('withProvider params name is required')
        }
        if (!target) {
            throw new ReactBootError('withProvider target is required')
        }
        // 定义提供组件的元数据
        const metaData: ReflectComponentMetaData = {
            name,
            version,
            isAsync,
            description,
        }
        Reflect.defineMetadata(REFLECT_COMPONENT_KEY, metaData, target)
        return target
    }
}

export default withProvider
