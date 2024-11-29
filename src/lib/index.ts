import 'reflect-metadata'
import { registerApp, startReactBoot, loadModules } from './core'
import Application from './decorators/Application'
import Provider from './decorators/Provider'
import Consumer from './decorators/Consumer'
import createApp from './hooks/createApp'
import withAsyncModules from './hooks/withAsyncModules'
import type { ReactBootConfig, ProviderParams, ConsumerParams } from './types'

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
     * 加载模块
     */
    loadModules(config).then(() => {
        /** 模块加载完成的回调 */
        config.onLoad?.()

        /** 运行应用启动类 */
        startReactBoot(config)
    })

    /**
     * 暴露应用及组件方法
     */
    return {
        createApp: createApp(config),
        Application: Application(config),
        Provider: (params: ProviderParams) => Provider(config, params),
        Consumer: (params: ConsumerParams) => Consumer(config, params),
    }
}

export * from './types'

export * from './interface'

export { ReactBoot, withAsyncModules }
