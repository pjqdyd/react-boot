import { bindReactBoot, bindModules, removeApp } from '../core'
import type { ReactBootApplication } from '../interface'
import type { AppParams, ApplicationTarget, ScanModules } from '../types'

/**
 * Application 应用启动类装饰器
 * @param app
 * @param modules
 */
const Application = (app: AppParams, modules?: ScanModules) => {
    const { name } = app
    return (target?: ApplicationTarget): ReactBootApplication | any => {
        if (!target) {
            // 使用装饰器 @Application()
            return Application(app)
        }
        if (typeof target === 'object') {
            // 使用装饰器 @Application({...})
            return Application(app, target.modules)
        }
        if (typeof target !== 'function') {
            // 未正确使用装饰器
            app.logger(`@Application({...}) should be used on the class function`, 'error')
            return
        }
        // 直接使用装饰器 @Application
        try {
            // 创建启动类
            const reactBoot: ReactBootApplication = new target()

            // 绑定应用启动类
            bindReactBoot(app, reactBoot)

            // 绑定模块加载器
            bindModules(app, modules)

            // 返回启动类实例
            return reactBoot
        } catch (e) {
            removeApp({ name })
            app.logger(`Application run fail: ${e}`, 'error')
        }
    }
}

export default Application
