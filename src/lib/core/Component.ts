import type { ComponentType } from 'react'
import type { Component } from '../interface'

/**
 * 组件类
 */
class ComponentClass implements Component {
    name: string
    description?: string
    component: ComponentType | undefined
    versions: Map<string, Component>
    constructor(params: Component) {
        this.description = params.description
        this.name = params.name
        this.component = params.component
        this.versions = params.versions || new Map()
    }
}

export default ComponentClass
