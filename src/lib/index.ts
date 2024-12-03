import 'reflect-metadata'
import { registerApp, startReactBoot, loadModules, destroyApp } from './core'
import Application from './decorators/Application'
import Provider from './decorators/Provider'
import Consumer from './decorators/Consumer'
import createApp from './hooks/createApp'
import withProvider from './hooks/withProvider'
import useConsumer from './hooks/useConsumer'
import type { ReactBootConfig, ProviderParams, ConsumerParams, ReactBootReturns } from './types'

/**
 * ReactBoot 启动器
 * @param config
 * @return ReactBootReturns
 */
const ReactBoot = (config: ReactBootConfig): ReactBootReturns => {
    /**
     * 注册应用
     */
    registerApp(config)

    /**
     * 加载模块
     */
    loadModules(config).then(() => {
        /** 模块加载完成的回调 */
        config.onload?.()

        /** 运行应用启动类 */
        startReactBoot(config)
    })

    /**
     * 暴露应用装饰器及组件hooks方法
     */
    return {
        createApp: createApp(config),
        Application: Application(config),
        destroyApp: () => destroyApp(config),
        Provider: (params: ProviderParams) => Provider(config, params),
        Consumer: (params: ConsumerParams) => Consumer(config, params),
        withProvider: <T>(params: ProviderParams) => withProvider<T>(config, params),
        useConsumer: <T>(params: ConsumerParams) => useConsumer<T>(config, params),
    }
}

export * from './types'

export * from './interface'

export { ReactBoot }
