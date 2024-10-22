import { registerApp, removeApp, log } from '../core'
import { ApplicationParams, ReactBootClass } from '../types'

/**
 * Application 应用启动类装饰器
 * @param params
 */
const Application = (params: ApplicationParams) => {
    const { name, description } = { ...params }
    return (target?: ReactBootClass, className?: string) => {
        if (!target) return
        try {
            const reactBoot = new target()
            registerApp({ name, reactBoot, className, description })
            reactBoot.run()
            log(`${name}-Application register success`)
            return reactBoot
        } catch (e) {
            removeApp({ name })
            log(`${name}-Application register fail: ${e}`, 'error')
        }
    }
}

export default Application
