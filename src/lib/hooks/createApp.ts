import { bindReactBoot, bindModules, log, removeApp } from '../core'
import type { ApplicationParams, ReactBootConfig } from '../types'
import type { ReactBootApplication } from '../interface'

/**
 * 应用启动类hooks
 * @param params
 */
const createApp = (params: ReactBootConfig) => {
    const { name } = params

    return (options: ReactBootApplication & ApplicationParams): ReactBootApplication | void => {
        const { run, destroy } = options
        if (typeof run !== 'function') {
            // 未正确使用 createApp
            log(`[${String(name)}] createApp should accepted the function argument`, 'error')
            return
        }
        // 直接使用 createApp(function, function)
        try {
            // 创建启动类
            const reactBoot: ReactBootApplication = {
                run: run,
                destroy: destroy,
            }

            // 绑定启动类
            bindReactBoot({ name, reactBoot, className: run.name || 'Function' })

            // 绑定模块加载器
            bindModules({ ...params, modules: options.modules })

            // 返回实例
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`[${String(name)}] Application run fail: ${e}`, 'error')
        }
    }
}

export default createApp
