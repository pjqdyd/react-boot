import { REFLECT_COMPONENT_KEY } from '../core'
import ReactBootError from '../exception'
import type { ProviderParams, ReactBootConfig } from '../types'
import type { ReflectComponentMetaData } from '../interface'

/**
 * withProvider 组件提供hooks
 * @param config
 * @param providerParams
 */
const withProvider = <T>(config: ReactBootConfig, providerParams: ProviderParams) => {
    const { name, version, description } = providerParams
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
            description,
        }
        Reflect.defineMetadata(REFLECT_COMPONENT_KEY, metaData, target)
        return target
    }
}

export default withProvider
