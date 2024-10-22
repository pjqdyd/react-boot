import type { Component } from '../interface'

/**
 * 组件类
 */
class ComponentClass implements Component {
    name: string
    description?: string
    component: Component | undefined
    versions: Map<string, Component>
    constructor(params: Component) {
        this.description = params.description
        this.name = params.name
        this.component = params.component
        this.versions = params.versions
    }
}

export default ComponentClass
