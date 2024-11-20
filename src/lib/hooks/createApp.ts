import { bindReactBoot, log, removeApp } from '../core'
import type { ApplicationParams } from '../types'
import type { ReactBootApplication } from '../interface'

/**
 * 应用启动类hooks
 * @param params
 */
const createApp = (params: ApplicationParams) => {
    const { name } = { ...params }

    return (options: ReactBootApplication): ReactBootApplication | undefined => {
        const { run, destroy } = options
        if (typeof run !== 'function' || typeof destroy !== 'function') {
            // 未正确使用 createApp
            log(`[${name.toString()}] createApp should accepted the function argument`, 'error')
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
            // 返回实例
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`[${name.toString()}] Application run fail: ${e}`, 'error')
        }
    }
}

export default createApp
