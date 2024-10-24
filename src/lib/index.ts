import Application from './decorators/Application'
import createApp from './hooks/createApp'
import type { ReactBootApplication } from './interface'
import type { ApplicationParams } from './types'

/**
 * ReactBoot 启动器
 * @param appParams
 * @constructor
 */
const ReactBoot = (appParams: ApplicationParams) => {
    return {
        Application: (params?: Partial<ApplicationParams>) => Application({ ...appParams, ...(params || {}) }),
        Provider: () => null,
        Consumer: () => null,
        createApp: (params?: Partial<ApplicationParams>) => createApp({ ...appParams, ...(params || {}) }),
    }
}

export * from './types'

export { ReactBoot, ReactBootApplication }
