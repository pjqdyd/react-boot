import { bindDestroy, registerApp, log, removeApp } from '../core'
import { ApplicationParams } from '../types'
import { ReactBootApplication } from '../interface'

/**
 * 应用启动类hooks
 * @param params
 */
const createApp = (params: ApplicationParams) => {
    const { name, description } = { ...params }

    return (
        target?: (() => void) | ApplicationParams,
        fun1?: () => void,
        fun2?: () => void,
    ): ReactBootApplication | undefined => {
        if (!target || typeof target === 'object') {
            // 携带参数使用 createApp({...}, function, function)
            return createApp({ ...params, ...(target || {}) })(fun1, fun2)
        }
        if (!target || typeof target !== 'function') {
            // 未正确使用 createApp
            log(`[${name}] createApp should accepted a function argument`, 'error')
            return
        }
        try {
            // 直接使用 createApp(function, function)
            const reactBoot: ReactBootApplication = {
                run: target,
                destroy: fun1,
            }
            // 注册应用
            registerApp({ name, reactBoot, className: target?.name || 'Function', description })
            // 绑定销毁事件
            bindDestroy({ name, reactBoot })
            // 运行启动方法
            target()
            log(`[${name}] Application register success`)
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`[${name}] Application register fail: ${e}`, 'error')
        }
    }
}

export default createApp
