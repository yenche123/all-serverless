// 把外部 sdk 的变量在这里做汇集
// 让其他业务文件保持干净，不要引入外部 sdk 的变量

// cloud.init() 入参的类型
import { CloudOptions as LafCloudOpt } from "laf-client-sdk"
import { ICloudBaseConfig as TcbCloudOpt } from "@cloudbase/node-sdk/types"
import { ICloudInitOptions as WxcbCloudOpt } from "wx-server-sdk"

// cloud.init() 返回的类型
import { CloudBase as TcbCloud } from "@cloudbase/node-sdk"
import { Cloud as LafCloud } from "laf-client-sdk"

// 整个 tcb 和 wxcb
import tcb from "@cloudbase/node-sdk"
import wxcb from "wx-server-sdk"

// 微信云开发 会用到的一些类型或对象
import { ICloud as WXCB_ICloud, DB as WXCB_DB } from "wx-server-sdk"


export {
  LafCloudOpt,
  TcbCloudOpt,
  WxcbCloudOpt,
  TcbCloud,
  LafCloud,
  tcb,
  wxcb,
  WXCB_ICloud,
  WXCB_DB,
}