import { bindReactBoot, bindModules, removeApp } from '../core'
import type { AppOptions } from '../types'
import type { App, ReactBootApplication } from '../interface'

/**
 * 应用启动类hooks
 * @param app
 */
const createApp = (app: App) => {
    const { name } = app

    return (options: AppOptions): ReactBootApplication | void => {
        const { run, destroy } = options || {}
        if (typeof run !== 'function') {
            // 未正确使用 createApp
            app.logger(`createApp options.run is not a function`, 'error')
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
            bindReactBoot(app, reactBoot)

            // 绑定模块加载器
            bindModules(app, options.modules)

            // 返回实例
            return reactBoot
        } catch (e) {
            removeApp({ name })
            app.logger(`Application run fail: ${e}`, 'error')
        }
    }
}

export default createApp
