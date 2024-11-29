import type { Component } from '../interface'
import type { Key } from '../types'

/**
 * 组件类
 */
class ComponentClass implements Component {
    readonly name: Key
    readonly version?: Key
    readonly description?: string
    readonly isAsync?: boolean = false
    readonly component: any

    constructor(params: Component) {
        this.name = params.name
        this.version = params.version
        this.description = params.description
        this.isAsync = params.isAsync
        this.component = params.component
    }
}

export default ComponentClass
