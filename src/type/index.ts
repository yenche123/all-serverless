import { LafCloudOpt, TcbCloudOpt, WxcbCloudOpt } from "./external"

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