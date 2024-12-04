import { version } from '../core'
import type { LogType } from '../types'

/**
 * 日志类型
 */
const types: Record<LogType, { level: number; color: string }> = {
    log: { level: 1, color: '#667EDE' },
    warn: { level: 2, color: '#D9A557' },
    error: { level: 3, color: '#EC4949' },
}

/**
 * 打印日志
 * @param message
 * @param type
 */
export const log = (message: string, type: 'log' | 'warn' | 'error' = 'log') => {
    console[type]?.(
        `%c ReactBoot ${version}: `,
        `color: #ffffff; font-weight: bold; background: ${types[type]?.color};`,
        message,
    )
}

/**
 * 判断是否需要打印日志
 * @param type
 * @param logLevel
 */
export const needLog = (type: LogType, logLevel: LogType) => {
    return types[type]?.level >= types[logLevel]?.level
}

export default log
