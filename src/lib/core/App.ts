import type { App, Component, ReactBootApplication } from '../interface'
import type { Key } from '../types'

/**
 * 应用类
 */
class AppClass implements App {
    readonly name: Key
    readonly description?: string
    reactBoot?: ReactBootApplication
    modulesLoader?: Generator<Promise<void>, void>
    readonly components: Map<Key, Map<Key, Component>>

    constructor(params: App) {
        this.description = params.description
        this.name = params.name
        this.reactBoot = params.reactBoot
        this.modulesLoader = params.modulesLoader
        this.components = params.components || new Map()
    }
}

export default AppClass
