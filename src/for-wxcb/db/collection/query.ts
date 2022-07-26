// 因为 Query 是 Collection 的基类，故放到跟 collection/index.ts 同级，而非它的子文件夹

import { Db } from "../index"
import { SdkType } from "../../../type"
import { LAF_COL, TCB_COL, WXCB_COL, WXCB_DDD } from "../../../type/external"
import { sdkCha } from "../../../some-characteristic"

class Query {

  public target: SdkType

  public lafCol?: LAF_COL
  public tcbCol?: TCB_COL
  public wxcbCol?: WXCB_COL

  constructor(db: Db, colName: string) {
    let t = db.target
    this.target = t

    if(t === SdkType.LAF) {
      this.lafCol = db.lafDb?.collection(colName)
    }
    else if(t === SdkType.TCB) {
      this.tcbCol = db.tcbDb?.collection(colName)
    }
    else if(t === SdkType.WXCB) {
      this.wxcbCol = db.wxcbDb?.collection(colName)
    }
  }

  async count(): Promise<WXCB_DDD.ICountResult | void> {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let res = await lafCol.count()
      let res2: WXCB_DDD.ICountResult = {
        total: res.total,
        errMsg: sdkCha.WXCB.errMsg_count_ok,
      }
      return res2
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let res = await tcbCol.count()
      let res2 = {
        total: res.total ?? 0,
        errMsg: sdkCha.WXCB.errMsg_count_ok,
      }
      return res2
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let res = await wxcbCol.count()
      return res as WXCB_DDD.ICountResult
    }
  }

}

export { Query }