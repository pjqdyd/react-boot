import { createApp, version } from '../common'
import { ApplicationParams, ReactBootClass } from '../types'

/**
 * Application 应用启动类装饰器
 * @param params
 */
const Application = (params: ApplicationParams) => {
    const { name } = { ...params }
    return (target?: ReactBootClass, className?: string, descriptor?: PropertyDescriptor) => {
        if (!target) return
        const app = new target()
        createApp({ name, app, className, descriptor })
        app.run()
        console.log(`ReactBoot ${version} 应用注册成功：`, name)
    }
}

export default Application
