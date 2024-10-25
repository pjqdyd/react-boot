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
        Application: Application(appParams),
        Provider: () => null,
        Consumer: () => null,
        createApp: createApp(appParams),
    }
}

export * from './types'

export { ReactBoot, ReactBootApplication }
