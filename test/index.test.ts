import { getVersion, getPackageName } from '../src/index'

/**
 * 单元测试
 */
describe('src/index.ts 单元测试', () => {
    test('getVersion 获取版本号', () => {
        expect(getVersion()).toEqual('1.0.4')
    })

    test('getPackageName 获取项目名', () => {
        expect(getPackageName()).toEqual('@pjqdyd/npm-ts-demo')
    })
})
