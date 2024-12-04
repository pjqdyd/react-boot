import 'reflect-metadata'
import { registerApp, startReactBoot, loadModules, destroyApp } from './core'
import Application from './decorators/Application'
import Provider from './decorators/Provider'
import Consumer from './decorators/Consumer'
import createApp from './hooks/createApp'
import withProvider from './hooks/withProvider'
import useConsumer from './hooks/useConsumer'
import type { ReactBootConfig } from './interface'
import type { ProviderParams, ConsumerParams, ReactBootReturns } from './types'

/**
 * ReactBoot 启动器
 * @param config
 * @return ReactBootReturns
 */
const ReactBoot = (config: ReactBootConfig): ReactBootReturns => {
    /**
     * 注册应用
     */
    const app = registerApp(config)

    /**
     * 加载模块
     */
    loadModules(app).then(() => {
        /** 模块加载完成的回调 */
        config.onload?.()

        /** 运行应用启动类 */
        startReactBoot(app)
    })

    /**
     * 暴露应用装饰器及组件hooks方法
     */
    return {
        createApp: createApp(app),
        Application: Application(app),
        destroyApp: () => destroyApp(app),
        Provider: (params: ProviderParams) => Provider(app, params),
        Consumer: (params: ConsumerParams) => Consumer(app, params),
        withProvider: <T>(params: ProviderParams) => withProvider<T>(app, params),
        useConsumer: <T>(params: ConsumerParams) => useConsumer<T>(app, params, config),
    }
}

export * from './types'

export * from './interface'

export { ReactBoot }
