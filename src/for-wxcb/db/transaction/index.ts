import { Db } from "../index";
import { TCB_DDD, WXCB_DDD } from "../../../type/external"
import { SdkType } from "../../../type";


export type RunTranParam1 = (transaction: TCB_DDD.Transaction) => void | Promise<any>

export const runTransaction = (db: Db, callback: RunTranParam1, times: number = 3): Promise<any> | void => {
  let t = db.target
  if(t === SdkType.LAF) {
    throw new Error("laf 暂不支持 runTransaction API")
  }
  else if(t === SdkType.TCB) {
    let tcbDb = db.tcbDb as TCB_DDD.Db
    return tcbDb.runTransaction(callback, times)
  }
  else if(t === SdkType.WXCB) {
    let wxcbDb = db.wxcbDb as WXCB_DDD.Database
    //@ts-ignore
    return wxcbDb.runTransaction(callback, times)
  }
}

export const startTransaction = (db: Db): Promise<TCB_DDD.Transaction> | void => {
  let t = db.target
  if(t === SdkType.LAF) {
    throw new Error("laf 暂不支持 startTransaction API")
  }
  else if(t === SdkType.TCB) {
    let tcbDb = db.tcbDb as TCB_DDD.Db
    return tcbDb.startTransaction()
  }
  else if(t === SdkType.WXCB) {
    let wxcbDb = db.wxcbDb as WXCB_DDD.Database
    //@ts-ignore
    return wxcbDb.startTransaction()
  }
}
