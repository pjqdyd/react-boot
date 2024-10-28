import type { App, Component, ReactBootApplication } from '../interface'

/**
 * 应用类
 */
class AppClass implements App {
    name: string | symbol
    description?: string
    reactBoot?: ReactBootApplication
    components: Map<string, Component>

    constructor(params: App) {
        this.description = params.description
        this.name = params.name
        this.reactBoot = params.reactBoot
        this.components = params.components || new Map()
    }
}

export default AppClass
