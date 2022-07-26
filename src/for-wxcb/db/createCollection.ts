import { Db } from "./index";
import { SdkType } from "../../type";
import { WXCB_DDD, LAF_DB, TCB_DDD, WxcbCreateCollectionRes } from "../../type/external";
import { sdkCha } from "../../some-characteristic";

export const createCollection = (db: Db, collName: string): Promise<WxcbCreateCollectionRes> | void => {
  let t = db.target
  if(t === SdkType.LAF) {
    let lafDb = db.lafDb as LAF_DB
    return handle_laf(lafDb, collName)
  }
  else if(t === SdkType.TCB) {
    let tcbDb = db.tcbDb as TCB_DDD.Db
    return handle_tcb(tcbDb, collName)
  }
  else if(t === SdkType.WXCB) {
    let wxcbDb = db.wxcbDb as WXCB_DDD.Database
    return handle_wxcb(wxcbDb, collName)
  }
}

/**
 * 先去创建一个数据 再删除之，就有一个空的集合了
 * @param collName 集合名称
 */
async function handle_laf(lafDb: LAF_DB, collName: string): Promise<WxcbCreateCollectionRes> {
  let res1 = await lafDb.collection(collName).add({ "_id": "_init_add_" })
  console.log("看一下 handle_laf res1: ")
  console.log(res1)

  if(!res1 || !res1.id) {
    throw new Error("使用 laf-client-sdk 新建数据失败.....")
  }

  let w: any = {}
  let primaryKey = lafDb.primaryKey
  w[primaryKey] = res1.id
  let res2 = await lafDb.collection(collName).where(w).remove()

  console.log("看一下 handle_laf res2: ")
  console.log(res2)

  let res3: WxcbCreateCollectionRes = {
    requestId: res1.requestId,
    errMsg: sdkCha.WXCB.errMsg_createCollection_ok
  }
  return res3
}

async function handle_tcb(tcbDb: TCB_DDD.Db, collName: string): Promise<WxcbCreateCollectionRes> {
  let res = await tcbDb.createCollection(collName)
  let res2 = {
    requestId: res.requestId,
    errMsg: sdkCha.WXCB.errMsg_createCollection_ok,
  }
  return res2
}

async function handle_wxcb(wxcbDb: WXCB_DDD.Database, collName: string): Promise<WxcbCreateCollectionRes> {
  //@ts-ignore
  let res = await wxcbDb.createCollection(collName) as WxcbCreateCollectionRes
  return res
}