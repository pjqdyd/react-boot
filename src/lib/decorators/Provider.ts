import { REFLECT_COMPONENT_KEY } from '../core'
import ReactBootError from '../exception'
import type { ProviderConstructor, ProviderParams } from '../types'
import type { App, ReflectComponentMetaData } from '../interface'

/**
 * Provider 组件提供装饰器
 * @param app
 * @param providerParams
 */
const Provider = (app: App, providerParams: ProviderParams) => {
    const { name, version, isAsync, description } = providerParams || {}
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
            isAsync,
            description,
        }
        Reflect.defineMetadata(REFLECT_COMPONENT_KEY, metaData, target)
    }
}

export default Provider
