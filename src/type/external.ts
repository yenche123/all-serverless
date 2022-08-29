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
import * as tcb from "@cloudbase/node-sdk"
import * as wxcb from "wx-server-sdk"

// sdk 下的 cloud / db 类型
import { ICloud as WXCB_CLOUD, DB as WXCB_DDD } from "wx-server-sdk"
import { Db as LAF_DB } from "laf-client-sdk"
import { Database as TCB_DDD } from "@cloudbase/node-sdk"

// Command
const lafCloud = new LafCloud({})
const lafDb = lafCloud.database()
type LafCommand = typeof lafDb.command
type TcbCommand = typeof TCB_DDD.Command
type WxcbCommand = WXCB_DDD.DatabaseCommand

// sdk 下的 collection 类型以及其下方法的入参和出参类型
import { CollectionReference as LAF_COL, Query as LAF_QRY } from "database-ql"
type TCB_COL = TCB_DDD.CollectionReference
type WXCB_COL = WXCB_DDD.CollectionReference
type TCB_QRY = TCB_DDD.Query
type WXCB_QRY = WXCB_DDD.Query

// sdk 下的 document 类型
import { DocumentReference as LAF_DOC } from "database-ql"
type TCB_DOC = TCB_DDD.DocumentReference
type WXCB_DOC = WXCB_DDD.DocumentReference

// collection 类型下的 add()
import { AddRes as LafAddRes } from "database-ql/dist/commonjs/result-types"
type TcbAddRes = TCB_DDD.IAddRes
type WxcbAddRes = {
  errMsg: string
  _id?: string | number
  _ids?: Array<string | number>
}

// collection 类型下的 aggregate()
import LafAgg from "database-ql/dist/commonjs/aggregate"
type TcbAgg = TCB_DDD.Aggregation
type WxcbAgg = WXCB_DDD.Aggregate

// db.createCollection()
type WxcbCreateCollectionRes = {
  requestId?: string
  errMsg: string       // 默认为 createCollection:ok
}


export {
  LafCloudOpt,
  TcbCloudOpt,
  WxcbCloudOpt,
  TcbCloud,
  LafCloud,
  tcb,
  wxcb,
  WXCB_CLOUD,
  WXCB_DDD,
  LAF_DB,
  TCB_DDD,
  LAF_COL,
  TCB_COL,
  WXCB_COL,
  LAF_QRY,
  TCB_QRY,
  WXCB_QRY,
  LAF_DOC,
  TCB_DOC,
  WXCB_DOC,
  LafAddRes,
  TcbAddRes,
  WxcbAddRes,
  LafAgg,
  TcbAgg,
  WxcbAgg,
  WxcbCreateCollectionRes,
  LafCommand,
  TcbCommand,
  WxcbCommand
}