# all-serverless

改两行代码，直接切换 Serverless 云厂商！

比如原先在服务端/云函数（Node.js）使用的微信云开发

```js
const cloud = require("wx-server-sdk")
cloud.init()
```

使用原写法，切换到 Laf 云，只要这样做：

```js
const cloud = require("all-serverless/from-wxcb")
cloud.init({
  lafConfig: {
    baseUrl: "你的 laf 云环境地址",
  }
})
```

初始化后的剩余代码，都无需改变；从今以后使用 Serverless 拒绝厂商绑定！

## 注意

1. 请在迁移时，确保迁移后的数据库也包含原数据库的结构
2. 目前仅支持 Laf / 腾讯云开发 / 微信云开发 之间的任意切换
3. 原 `wx-server-sdk` 下关于 `openapi` / `cloudPay` / `callContainer` 属性或方法皆能在 `all-serverless/from-wxcb` 中使用，只不过 `all-serverless` 依然调用的是 `wx-server-sdk` 

## 开新项目

如果你不是迁移用户，没有任何历史包袱，非常推荐你使用 `all-serverless`。

```js
const cloud = require("all-serverless")
const app = cloud(totalConfig)
```

其中，`totalConfig` 为配置项（见下方），定义了具体云环境信息。

未来，我们无法确定哪个云厂商会作恶，比如任意哄抬价格、恶心用户。然而现在我们更多的选择，只要修改两行代码即可迁云。

你的后端云就应该像装在口袋里的巧克力，想吃哪一个就吃哪一个！

## totalConfig

|     属性     |   类型   | 必有 |       说明        |
| ------------ | ------- | ---- | ----------------- |
| targetSdk    | SdkType |  N   |  标识连的是哪个云厂商，默认为 `laf-client-sdk` |
| lafConfig    | LafCloudOpt |  N   |  当 targetSdk 为 `laf-client-sdk` 时必有 |
| tcbConfig    | TcbCloudOpt |  N   | 当 targetSdk 为 `@cloudbase/node-sdk` 时必有 |
| wxcbConfig   | WxcbCloudOpt | N   | 当 targetSdk 为 `wx-server-sdk` 时必有 |

### SdkType

有以下枚举值

|     字符串     |      说明        |
| ------------- | ---------------- |
| laf-client-sdk | 表示云环境连接到 Laf |
| @cloudbase/node-sdk | 表示云环境连接到 腾讯云开发 |
| wx-server-sdk | 表示云环境连接到 微信云开发 |

### LafCloudOpt

|     属性     |   类型   | 必有 |       说明        |
| ------------ | ------- | ---- | ----------------- |
|    baseUrl   | String  |  Y   | laf 应用的服务地址  |
|  dbProxyUrl  | String  |  N   | laf 访问策略的入口地址 |

该配置项同 laf-client-sdk 的 使用示例:

```js
import { Cloud } from 'laf-client-sdk'
const cloud = new Cloud(lafConfig)
```

具体请参考 [https://github.com/labring/laf/tree/main/packages/client-sdk](https://github.com/labring/laf/tree/main/packages/client-sdk#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)

### TcbCloudOpt

结构与腾讯云开发 Node.js SDK 的 `init()` 入参保持一直，即

```js
const tcb = require("@cloudbase/node-sdk")
const app = tcb.init(tcbCloudOpt)
```

具体请参见 [https://docs.cloudbase.net/api-reference/server/node-sdk/initialization](https://docs.cloudbase.net/api-reference/server/node-sdk/initialization#2-%E8%BE%93%E5%85%A5%E5%8F%82%E6%95%B0)

### WxcbCloudOpt

结构与微信云开发 Node.js SDK 的 `init()` 入参保持一直，即

```js
const cloud = require("wx-server-sdk")
cloud.init(wxcbCloudOpt)
```

具体请参见 [https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html)


