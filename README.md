# all-serverless

改三行代码，直接切换 Serverless 云厂商！

比如原先在服务端/云函数（Node.js）使用的微信云开发

```js
const cloud = require("wx-server-sdk")
cloud.init()
```

使用原写法，切换到 Laf 云，只要这样做：

```js
const asls = require("all-serverless")
const { wxcb: cloud, SdkType } = asls
cloud.init({
  targetSdk: SdkType.LAF,
  lafConfig: {
    baseUrl: "你的 laf 云环境地址",
    dbProxyUrl: "你的 laf 云访问策略路径",
  }
})

// 之后的代码 几乎无需改动！
```

初始化后的剩余代码，都无需改变；从今以后使用 Serverless 拒绝厂商绑定！

## 概览

Serverless 没有严格的定义，普遍上大家认为是 BaaS (后端即服务) + FaaS (函数即服务)。

Serverless 确实免去了业务开发人员关于服务器运维的工作量，却也带来了"厂商绑定"、"围墙花园"的问题。当开发者基于特定云厂商的 sdk 进行低成本开发，直到有一天云厂商说我要涨价，没有商量的余地，开发者才发现我所有的代码、配置、数据格式都是基于该云厂商的，想迁云？天方夜谈！

`all-serverless` 是在这样的背景下诞生的。虽然做不到一键迁云这么简单，但还是非常期望让开发者在业务层只要修改少许的代码（主要是初始化的部分）就完成切换云平台的作用。

撇开人和设备 (机器) 所扮演的角色，如果将一个完整的应用简化成 "前端代码" + "后端代码" + "配置(环境)" + "数据"，那么值得注意的是，`all-serverless` 提供的是 "后端代码" `运行时`的迁移 (兼容) 方案，并且聚焦于 `数据库 db 的操作` 上，所以其他因素的迁移————包括后端代码如何部署、CLI脚手架、配套插件等————都不在本项目的讨论范围。

在研究各个云厂商关于 Serverless SDK 的实现时，有不少是大同小异的，比如触发云函数有的叫 `callFunction` 有的则叫 `invokeFunction`，有的返回参数用 `data` 有的则用 `list`，仔细一看明明做的是一样的事却有着不同的`写法`，直叫人抓狂！

因此，`all-serverless` 的目标是弭平各个云厂商所实现的 SDK 差异，让开发者随意使用一种 sdk 之写法也可以快速兼容其他云平台的 Serverless 服务，远景是**让万物皆可 Serverless!**

## 原理

你可以把 `all-serverless` 当作一个**转换器**，它仅有的并且实际使用到的外部依赖目前为 `laf-client-sdk` / `@cloudbase/node-sdk` / `wx-server-sdk`。

当你使用 `wx-server-sdk` 所定义的写法格式时，`all-serverless` 负责把你的请求转换成目标 SDK 的格式，最后使用目标 SDK 发起请求，得到结果后再把结果转回 `wx-server-sdk` 的写法格式再返回给你，如此实现兼容。

未来也会兼容其他 SDK 的写法格式，见[TODO](#todo)。

## 安装

```sh
npm i all-serverless
# or
pnpm i all-serverless
```

## 迁云

如果你之前使用了 `laf-client-sdk` / `@cloudbase/node-sdk` / `wx-server-sdk` 以上任意 sdk 写了后端应用，现在想实现快速迁移至其他 Serverless 平台时，请留意以下注意事项:

1. 本项目仅支持后端云函数上的代码迁移
2. `all-serverless` 为后端 sdk，请不要在前端使用
3. 本项目不提供数据的迁移，请在迁移云函数代码前，确保迁移后的数据库也包含原数据库的结构。
4. 支持 `Laf` / `腾讯云开发` / `微信云开发` 之间的任意切换，然而目前仅支持微信云开发 `wx-server-sdk` 的写法格式，即初始化之后的 `cloud` 的使用方式完全与微信云开发一致。
5. 原 `wx-server-sdk` 下关于 `openapi` / `cloudPay` / `callContainer` 属性或方法皆能在 `wxcb` 中使用，只不过 `all-serverless` 会直接调用 `wx-server-sdk` 而非你所指定的 `targetSdk`。
6. 本项目聚焦于 `db` 数据库操作的代码迁移，也就是最常见的增删改查 CRUD 和聚合操作，故不支持文件存储 (uploadFile / getTempFileURL / deleteFile / downloadFile)、数据库事务 (startTransaction) 、用户系统（user，包含鉴权相关的 auth）和广告数据上报 (analytics) 等延申操作。
7. 与其说"迁移"，不如说"兼容"。

## 开新项目

如果你不是迁移用户，没有任何历史包袱，依然非常推荐你使用 `all-serverless`。一起拒绝被任何云厂商绑定！

当前支持的微信云开发写法，其初始化方式如下:

```js
// CommonJS
const asls = require("all-serverless")
const { wxcb: cloud, SdkType } = asls

// or ESModule or TypeScript
import { wxcb as cloud, SdkType } from "all-serverless"

// 数据库连接到 laf
cloud.init({
  targetSdk: SdkType.LAF,
  lafConfig: {
    // 配置见 https://www.lafyun.com/guide/db/
  },
  // 或者，如果直接在 laf 云函数上，可以直接传 lafCloudSdk
  lafCloudSdk: LafCloud,
})

// 数据库连接到 腾讯云开发
cloud.init({
  targetSdk: SdkType.TCB,
  tcbConfig: {
    // 配置见 https://docs.cloudbase.net/api-reference/server/node-sdk/initialization#init
    // 结构同 tcb.init(opt) 的 opt
    secretId: "你的腾讯云 secretId",
    secretKey: "你的腾讯云 secretKey",
    env: "你的腾讯云开发环境标识",
  }
})

// 数据库连接到 微信云开发
cloud.init({
  targetSdk: SdkType.WXCB,
  wxcbConfig: {
    // 配置见 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html
    // 结构同 cloud.init(options) 的 options
  }
})

```

其中，`wxcb`（weixin-cloudbase）表示使用微信云开发的写法，未来也会支持 `tcb` (腾讯云开发) 和 `laf` (laf云开发) 的写法。

`all-serverless` 让你的后端代码与平台无关，不再被特定 sdk 绑架，快速兼容其他云平台的 sdk。

你的后端云就应该像装在口袋里的巧克力，想吃哪一个就吃哪一个！

<br>

## 初始化

```js
import { wxcb as cloud, SdkType } from "all-serverless"
cloud.init(initOptions)
```

其中 `initOptions` 配置如下

### initOptions

|     属性     |     类型     | 必有 |       说明        |
| ------------ | ----------- | ---- | ----------------- |
| targetSdk    |   SdkType   |  N   |  标识连的是哪个云厂商 |
| lafConfig    | LafCloudOpt |  N   |  同 `laf-client-sdk` 的初始化配置项一致，当 `targetSdk` 为 `SdkType.LAF` 时与 `lafCloudSdk` 二选一 |
| lafCloudSdk  | LafCloud    |  N   |  注1，当 `targetSdk` 为 `SdkType.LAF` 时与 `lafConfig` 二选一 |
| tcbConfig    | TcbCloudOpt |  N   |  当 `targetSdk` 为 `SdkType.TCB` 时必有 |
| wxcbConfig   | WxcbCloudOpt | N   |  当 `targetSdk` 为 `SdkType.WXCB` 时必有 |

> 注1: 当前云函数部署在 laf 云时，可传入 `import cloud from '@/cloud-sdk'` 的 `cloud` 作为属性 `lafCloudSdk` 的值，使后续调用执行的是免鉴权的 `cloud-sdk` 而非 `laf-client-sdk`，省略前端访问策略的配置。

#### SdkType

有以下枚举值

|   枚举值   |    最终调用的 sdk        |           说明            |
| --------- | ----------------------- | ------------------------- |
|    LAF    |   laf-client-sdk (注2)  |  表示云环境连接到 Laf       |
|    TCB    |   @cloudbase/node-sdk   |  表示云环境连接到 腾讯云开发 |
|    WXCB   |   wx-server-sdk         |  表示云环境连接到 微信云开发 |

> 注2: 若 `lafCloudSdk` 有值，最终调用的 sdk 改为 laf 云上的 `cloud-sdk`

#### LafCloudOpt

|     属性     |   类型   | 必有 |       说明        |
| ------------ | ------- | ---- | ----------------- |
|    baseUrl   | String  |  Y   | laf 应用的服务地址  |
|  dbProxyUrl  | String  |  Y   | laf 访问策略的入口地址 |

该配置项同 laf-client-sdk 的使用示例:

```js
import { Cloud } from 'laf-client-sdk'
const cloud = new Cloud(lafConfig)
```

具体请参考 [https://github.com/labring/laf/tree/main/packages/client-sdk](https://github.com/labring/laf/tree/main/packages/client-sdk#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)

#### TcbCloudOpt

结构与腾讯云开发 Node.js SDK 的 `init()` 入参保持一致，即

```js
const tcb = require("@cloudbase/node-sdk")
const app = tcb.init(tcbCloudOpt)
```

具体请参见 [https://docs.cloudbase.net/api-reference/server/node-sdk/initialization](https://docs.cloudbase.net/api-reference/server/node-sdk/initialization#2-%E8%BE%93%E5%85%A5%E5%8F%82%E6%95%B0)

#### WxcbCloudOpt

结构与微信云开发 Node.js SDK 的 `init()` 入参保持一致，即

```js
const cloud = require("wx-server-sdk")
cloud.init(wxcbCloudOpt)
```

具体请参见 [https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html)

## 初始化之后

假设已有下方初始化的代码

```js
// 当前支持的微信云开发写法
import { wxcb as cloud } from "all-serverless"

// 后续将支持腾讯云开发的写法
// import { tcb } from "all-serverless"
// const app = tcb.init()

// 后续将支持 laf 云开发的写法
// import { LafCloud as Cloud } from "all-serverless"
// const cloud = new Cloud()
```

我们已实现了各个 BaaS 在`数据库操作`层的大致兼容，那 FaaS 呢？

各个云服务厂商的云函数之异同体现在`入口文件`、`部署方式`、`获取入参`以及`返回出参`等地方，其中`入口文件`和`部署方式`涉及各个云厂商工具链的差异，较难弭平各个 SDK 的差异，如前文所说不在本项目的讨论范围；而`返回出参`在异步的云函数上有些会直接用 `return`，有些则用 `response.send()` 来传递，这一块也较难完成统一。故 `all-serverless` 主要在 `获取入参` 之处来帮助开发者统一各端的差异。

## faas 

```js
// ES6 or TypeScript
import { faas } from "all-serverless"
// CommonJS
const asls = require("all-serverless")
const { faas } = asls
```

### getEntryData(param1[, param2])

获取入参

#### param1

必填，云函数的入口函数之第一个参数

#### param2

选填，云函数的入口函数之第二个参数

#### 返回

开发者自定义的入参 body，如果 `all-serverless` 判别环境失败则返回一个空对象 `{}`

#### 使用方式

```js
// 在腾讯云函数 scf 上（腾讯云开发、微信云开发的云函数都是复用 scf 的）
exports.main = async (param1, param2) => {
  const event = faas.getEntryData(param1, param2)
}
```

```ts
// 在 laf 云函数上
exports.main = async (param1: FunctionContext) => {
  const event = faas.getEntryData(param1)
}
```

### getFaaSManufacturer(param1, param2): FaaSManufacturer

获取当前云函数运行所在的厂商

#### param1

必填，云函数的入口函数之第一个参数

#### param2

选填，云函数的入口函数之第二个参数

#### 返回值 FaaSManufacturer

`FaaSManufacturer` 有以下字符串: 

- `lafyun`: 表示laf云 
- `tencent-scf`: 表示腾讯云
- `空字符串`: 表示未知


<br>

## TODO

- [ ] 支持 `腾讯云开发` 的写法
- [ ] 支持 `Laf` 的写法
- [ ] 支持 `Firebase` 的写法 + 覆盖其他端
- [ ] 支持 `Supabase` 的写法 + 覆盖其他端 （需调研 MonogoDB 和 PostgreSQL 的转换）

## 开源协议

MIT