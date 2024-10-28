import { registerApp } from './core'
import Application from './decorators/Application'
import Provider from './decorators/Provider'
import Consumer from './decorators/Consumer'
import createApp from './hooks/createApp'
import type { ReactBootApplication } from './interface'
import type { ApplicationParams } from './types'

/**
 * ReactBoot 启动器
 * @param appParams
 * @constructor
 */
const ReactBoot = (appParams: ApplicationParams) => {
    /**
     * 注册应用
     */
    registerApp(appParams)

    /**
     * 暴露应用及组件方法
     */
    return {
        createApp: createApp(appParams),
        Application: Application(appParams),
        Provider: (params: any) => Provider(appParams, params),
        Consumer: (params: any) => Consumer(appParams, params),
    }
}

export * from './types'

export { ReactBoot, ReactBootApplication }
