import { bindReactBoot, removeApp, log } from '../core'
import { ApplicationParams, ReactBootConstructor } from '../types'

/**
 * Application 应用启动类装饰器
 * @param params
 */
const Application = (params: ApplicationParams) => {
    const { name } = params
    return (target?: ReactBootConstructor | undefined) => {
        if (!target) {
            // 使用装饰器 @Application()
            return Application({ ...params })
        }
        if (typeof target !== 'function') {
            // 未正确使用装饰器
            return log(`[${name.toString()}] @Application should be used on the class function`, 'error')
        }
        // 直接使用装饰器 @Application
        try {
            // 创建启动类
            const reactBoot = new target()
            // 绑定应用启动类
            bindReactBoot({ name, reactBoot, className: target.name })
            // 返回启动类实例
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`[${name.toString()}] Application run fail: ${e}`, 'error')
        }
    }
}

export default Application
