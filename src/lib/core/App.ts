import { log, needLog } from '../log'
import type { App, Component, ReactBootApplication } from '../interface'
import type { Key, LogType } from '../types'

/**
 * 应用类
 */
class AppClass implements App {
    name: Key
    description?: string
    reactBoot?: ReactBootApplication
    modulesLoader?: Generator<Promise<void>, void>
    logLevel: LogType
    components: Map<Key, Map<Key, Component>>

    constructor(params: Partial<App>) {
        this.description = params.description
        this.name = params.name || ''
        this.reactBoot = params.reactBoot
        this.modulesLoader = params.modulesLoader
        this.logLevel = params.logLevel || 'log'
        this.components = params.components || new Map()
    }

    logger(message: string, type: LogType = 'log') {
        if (needLog(type, this.logLevel)) {
            log(`[${String(this.name)}] ${message}`, type)
        }
    }
}

export default AppClass
