import { LafCloudOpt, TcbCloudOpt, WxcbCloudOpt, LafCloud } from "./external"

export enum SdkType {
  LAF = "laf-client-sdk",
  TCB = "@cloudbase/node-sdk",
  WXCB = "wx-server-sdk"
}

export interface InitConfig {

  /**
	 * 指定转换后使用哪个 sdk 输出，可以简单理解为连入哪个云服务商
	 * @default laf-client-sdk
	 */
  targetSdk: SdkType

  /**
	 * 是否开启 调试（也就是打印），建议第一次使用时打开
	 * @default false
	 */
	debug?: boolean

  /**
	 * 当 targetSdk 为 laf-client-sdk 时必有
	 * 结构同 
	 * ```js
	 * const cloud = require("laf-client-sdk").init(param1)
	 * ```
	 * 的 `param1`
	 * 或
	 * ```js
	 * import { Cloud } from "laf-client-sdk"
	 * const cloud = new Cloud(param2)
	 * ```
	 * 的 `param2`
	 * @tip 详情见 https://github.com/labring/laf/tree/main/packages/client-sdk
	 */
	lafConfig?: LafCloudOpt

	/**
	 * 如果当前业务环境在 laf 的云函数上
	 * 并且连接的数据库也在 laf 上，
	 *   即 targetSdk 为 SdkType.LAF (ts) / laf-client-sdk (js)
	 * 那么多传入一个 @/cloud-sdk 生成的实例 cloud 作为属性 lafCloudSdk 的值
	 * all-serverless 将在内部直接使用 @/cloud-sdk 进行后续调用，实现在云函数上免鉴权
	 */
	lafCloudSdk?: LafCloud

  /**
	 * 当 targetSdk 为 @cloudbase/node-sdk 时必有
   * 结构同
   * ```js
   * const app = tcb.init(param)
   * ```
   * 的 `param`
	 * @tip 详情见 https://docs.cloudbase.net/api-reference/server/node-sdk/initialization
	 */
	tcbConfig?: TcbCloudOpt

	/**
	 * 当 targetSdk 为 wx-server-sdk 时必有
   * 结构同
   * ```js
   * const cloud = require('wx-server-sdk')
	 * cloud.init(param)
   * ```
   * 的 `param`
	 * @tip 详情见 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html
	 */
	wxcbConfig?: WxcbCloudOpt
}