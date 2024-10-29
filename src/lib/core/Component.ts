import type { ComponentType } from 'react'
import type { Component } from '../interface'
import type { Key } from '../types'

/**
 * 组件类
 */
class ComponentClass implements Component {
    readonly name: Key
    readonly description?: string
    component: ComponentType | undefined
    versions: Map<Key, Component>
    constructor(params: Component) {
        this.description = params.description
        this.name = params.name
        this.component = params.component
        this.versions = params.versions || new Map()
    }
}

export default ComponentClass
