import { bindDestroy, registerApp, log, removeApp } from '../core'
import { ApplicationParams } from '../types'
import { ReactBootApplication } from '../interface'

/**
 * 应用启动类hooks
 * @param params
 */
const createApp = (params: ApplicationParams) => {
    const { name, description } = { ...params }
    return (run: () => void, destroy?: () => void) => {
        try {
            const reactBoot: ReactBootApplication = {
                run: run,
                destroy: destroy,
            }
            // 注册应用
            registerApp({ name, reactBoot, className: run?.name || 'Function', description })
            // 绑定销毁事件
            bindDestroy({ name, reactBoot })
            // 运行启动方法
            run()
            log(`[${name}] Application register success`)
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`[${name}] Application register fail: ${e}`, 'error')
        }
    }
}

export default createApp
