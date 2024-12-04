import { version } from '../core'
import { LogConfig, LogType, LogTypes } from '../types'

/**
 * 日志类型
 */
const types: Record<LogTypes, LogConfig> = {
    log: { level: 1, bgColor: '#667EDE', style: '' },
    warn: { level: 2, bgColor: '#D9A557', style: '' },
    error: { level: 3, bgColor: '#EC4949', style: '' },
    system: { level: 10, bgColor: '#667EDE', style: 'color: #667EDE; font-weight: bold;' },
}

/**
 * 打印日志
 * @param message
 * @param type
 */
export const log = (message: string, type: LogTypes = 'log') => {
    const t = types[type] || {}
    if (type === 'system') type = 'log'
    console[type]?.(
        `%c ReactBoot ${version}: %c ${message}`,
        `color: #ffffff; font-weight: bold; background: ${t.bgColor};`,
        `${t.style}`,
    )
}

/**
 * 判断是否需要打印日志
 * @param type
 * @param logLevel
 */
export const needLog = (type: LogTypes, logLevel: LogType) => {
    return types[type]?.level >= types[logLevel]?.level
}

export default log
