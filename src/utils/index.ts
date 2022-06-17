// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pkg from '../../package.json'

/**
 * 获取版本号
 * @return string
 */
export const getVersion = (): string => {
    return pkg.version as string
}

/**
 * 获取项目名称
 * @return string
 */
export const getPackageName = (): string => {
    return pkg.name as string
}
