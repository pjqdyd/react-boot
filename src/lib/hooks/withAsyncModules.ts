import type { AsyncModuleOption, AsyncModules } from '../interface'

/**
 * 定义异步模块
 * @param options
 */
const withAsyncModules = (options: AsyncModuleOption[]) => {
    const asyncModules: AsyncModules = {}
    options?.forEach?.((option) => {
        const mods = Object.entries(option.module)
        // 匹配到多个只取第1个
        const [path, asyncMod] = mods[0]
        asyncModules[path] = {
            ...option,
            isAsync: true,
            module: asyncMod,
        }
    })
    return asyncModules
}

export default withAsyncModules
