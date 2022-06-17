
#### The demo project of npm typescript 发布npm仓库的ts模板项目

<h2 align="middle">npm-ts-demo</h2>
<p align="middle">
    <a href="https://www.npmjs.com/package/@pjqdyd/use-hooks" target="_blank">
        <img src="https://badgen.net/badge/version/v1.0.3"/>
    </a>
    <img src="https://badgen.net/badge/language/typescript/cyan"/>
    <img src="https://badgen.net/badge/package/npm/blue"/>
    <img src="https://badgen.net/badge/license/MIT/green"/>
    <img src="https://badgen.net/badge/contributors/1/blue"/>
    <img src="https://badgen.net/badge/package size/2.3kb/blue"/>
</p>

---

#### Background：
 此项目并没有什么内容，只是一个发布npm包的示例ts项目.

#### Install：
```
// npm 安装
npm install @pjqdyd/npm-ts-demo

// yarn 安装
yarn add @pjqdyd/npm-ts-demo
```

#### How to use：
```
import { getVersion } from '@pjqdyd/npm-ts-demo'

const version = getVersion();

console.log('项目版本号：', version)
```

#### All Methods：
 * **getVersion** 获取项目版本号
 * **getPackageName** 获取项目名称
 * ...
 * ed: 等待后续添加更多 (欢迎pr) ...

#### How to publish npm:
```
npm run build

npm login

// 发布@xxx私有包为公共, 使用--access publish
npm publish --access public
```
#### How to update npm:
1. change the version.
2. build.
3. npm publish.

#### License

This project is licensed under the [MIT](https://github.com/pjqdyd/npm-ts-demo/blob/master/LICENSE) license.
