/**
 * 自定义异常
 */
class ReactBootError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
        console.error(`ReactBootError: ${this.name} ${message}`)
    }
}

export default ReactBootError
