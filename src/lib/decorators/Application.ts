import { registerApp, removeApp, log, bindDestroy } from '../core'
import { ApplicationParams, ReactBootClass } from '../types'

/**
 * Application 应用启动类装饰器
 * @param params
 */
const Application = (params: ApplicationParams) => {
    const { name, description } = { ...params }
    return (target?: ReactBootClass | ApplicationParams, className?: string) => {
        if (!target || typeof target === 'object') {
            // 使用装饰器时携带了参数 @Application({...})
            return Application({ ...params, ...(target || {}) })
        }
        if (!target || typeof target !== 'function') {
            // 未正确使用装饰器
            return log(`[${name}] @Application should be used on the class function`, 'error')
        }
        // 直接使用装饰器 @Application
        try {
            const reactBoot = new target()
            // 注册应用
            registerApp({ name, reactBoot, className, description })
            // 绑定销毁事件
            bindDestroy({ name, reactBoot })
            // 运行启动方法
            reactBoot.run()
            log(`[${name}] Application register success`)
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`[${name}] Application register fail: ${e}`, 'error')
        }
    }
}

export default Application
