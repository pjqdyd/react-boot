import 'reflect-metadata'
import { registerApp, loadModules, updateLoadState } from './core'
import Application from './decorators/Application'
import Provider from './decorators/Provider'
import Consumer from './decorators/Consumer'
import createApp from './hooks/createApp'
import type { ReactBootApplication } from './interface'
import type { ReactBootConfig } from './types'

/**
 * ReactBoot 启动器
 * @constructor
 * @param config
 */
const ReactBoot = (config: ReactBootConfig) => {
    /**
     * 注册应用
     */
    registerApp(config)

    /**
     * 加载并注入模块
     */
    loadModules(config)

    /**
     * 暴露应用及组件方法
     */
    return {
        createApp: createApp(config),
        Application: Application(config),
        Provider: (params: any) => Provider(config, params),
        Consumer: (params: any) => Consumer(config, params),
    }
}

export * from './types'

export { ReactBoot, ReactBootApplication }
