/** 外部 sdk */
import { CloudOptions as LafCloudOpt } from "laf-client-sdk"
import { ICloudBaseConfig as TcbCloudOpt } from "@cloudbase/node-sdk/types"
import { ICloudInitOptions as WxcbCloudOpt } from "wx-server-sdk"
import { SupabaseClientOptions } from "@supabase/supabase-js"

/** 内部方法 */
import { RequireSth } from "../utils/type-tool"

export enum SdkType {
  LAF = "laf-client-sdk",
  TCB = "@cloudbase/node-sdk",
  WXCB = "wx-server-sdk",
  SUPABASE = "@supabase/supabase-js"
}

export interface SupabaseCloudOpt {
  supabaseUrl: string

  /** 
   * 可以是 SUPABASE_KEY 或叫 CLIENT API KEY（可公开）
   *   或
   * SERVICE_KEY (必须存于后端，绝不可暴露于浏览器或客户端) 
  */
  supabaseKey: string

  options?: SupabaseClientOptions
}

export interface TotalConfig {

	/**
	 * 转换后使用哪个 sdk 输出，可以简单理解为连入哪个云服务商
	 * @default laf-client-sdk
	 */
	targetSdk?: SdkType

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

  supabaseConfig?: SupabaseCloudOpt
}

export type AsCloudCfg = RequireSth<TotalConfig, "targetSdk">