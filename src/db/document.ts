// 外部 sdk 引入
import { AddRes as LafAddRes } from "database-ql/dist/commonjs/result-types"
import { CollectionReference as LafCol } from "database-ql"
import { Database as TcbDDD  } from "@cloudbase/node-sdk"
type TcbCol = TcbDDD.CollectionReference
import { DB as WxcbDDD } from "wx-server-sdk"
type WxcbCol = WxcbDDD.CollectionReference

// 内部 变量 引入
import { SdkType } from "../types"
import { CollectionRef } from "./collection"
import { AddRes } from "../types/db"
import check from "../utils/check"
import { sdkCha } from "../some-characteristic"

export class DocumentRef {

  private _col: CollectionRef

  readonly id?: string | number

  constructor(col: CollectionRef, docID?: string | number) {
    this._col = col
    this.id = docID
  }

  async create(data: any): Promise<AddRes> {
    let col = this._col
    let t = col.target

    let tmpRes: any = {};   // 暂时获取返回值
    let isArray = check.isArray(data)

    if(t === SdkType.LAF) {
      let lafCol = col.lafCol as LafCol
      let tmpLaf: LafAddRes;
      if(isArray) {
        if(!tmpRes.ids) tmpRes.ids = []
        for(let i=0; i<(data as any[]).length; i++) {
          let v = data[i]
          tmpLaf = await lafCol.add(v)
          if(!tmpRes.requestId && tmpLaf.requestId) tmpRes.requestId = tmpLaf.requestId
          if(tmpLaf.id) tmpRes.ids.push(tmpLaf.id)
          if(tmpLaf.code) tmpRes.code = String(tmpLaf.code)
          if(tmpLaf.error) tmpRes.message = tmpLaf.error
        }
      }
      else {
        tmpLaf = await lafCol.add(data)
        tmpRes = {
          requestId: tmpLaf.requestId,
          id: tmpLaf.id,
          code: tmpLaf.code,
          message: tmpLaf.error
        }
      }
    }
    else if(t === SdkType.TCB) {
      let tcbCol = col.tcbCol as TcbCol
      tmpRes = await tcbCol.add(data)
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = col.wxcbCol as WxcbCol
      tmpRes = await wxcbCol.add({ data })
      let errMsg = tmpRes.errMsg
      if(tmpRes._id) {
        tmpRes.id = tmpRes._id
        delete tmpRes._id
      }
      else if(tmpRes._ids) {
        tmpRes.ids = [...tmpRes._ids]
        delete tmpRes._ids
      }
      else if(!tmpRes.requestId) {
        tmpRes.requestId = "The add() in wx-server-sdk does not support requestId"
      }
      else if(errMsg) {
        if(!errMsg.includes(sdkCha.WXCB.errMsg_add_ok)) tmpRes.message = errMsg
      } 
    }

    return tmpRes as AddRes
  }


}