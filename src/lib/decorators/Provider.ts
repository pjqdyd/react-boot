import { REFLECT_COMPONENT_KEY } from '../core'
import ReactBootError from '../exception'
import type { ProviderConstructor, ProviderParams, ReactBootConfig } from '../types'
import type { ReflectComponentMetaData } from '../interface'

/**
 * Provider 组件提供装饰器
 * @param config
 * @param providerParams
 */
const Provider = (config: ReactBootConfig, providerParams: ProviderParams) => {
    const { name, version, description } = providerParams
    return (target?: ProviderConstructor) => {
        if (!name) {
            throw new ReactBootError('@Provider params name is required')
        }
        if (!target || typeof target !== 'function') {
            throw new ReactBootError('@Provider target must be a class')
        }
        // 定义提供组件的元数据
        const metaData: ReflectComponentMetaData = {
            name,
            version,
            description,
        }
        Reflect.defineMetadata(REFLECT_COMPONENT_KEY, metaData, target)
    }
}

export default Provider
