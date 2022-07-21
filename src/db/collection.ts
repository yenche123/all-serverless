// 引入 外部sdk
import { CollectionReference as LafCol } from "database-ql"
import { Database as TcbDDD  } from "@cloudbase/node-sdk"
type TcbCol = TcbDDD.CollectionReference
import { DB as WxcbDDD } from "wx-server-sdk"
type WxcbCol = WxcbDDD.CollectionReference

// 引入 内部变量
import { SdkType } from "../types"
import { DocumentRef } from "./document"
import { Db } from "./index"
import { Query } from "./query"

export class CollectionRef extends Query {

  public target: SdkType
  
  public lafCol?: LafCol
  public tcbCol?: TcbCol
  public wxcbCol?: WxcbCol

  constructor(db: Db, collName: string) {
    super(db, collName)

    let t = db.target
    this.target = t

    if(t === SdkType.LAF) {
      this.lafCol = db.lafDb?.collection(collName)
    }
    else if(t === SdkType.TCB) {
      this.tcbCol = db.tcbDb?.collection(collName)
    }
    else if(t === SdkType.WXCB) {
      this.wxcbCol = db.wxDb?.collection(collName)
    }
  }

  public doc(docID: string | number) {
    if (typeof docID !== 'string' && typeof docID !== 'number') {
      throw new Error('docID is required to string or number')
    }
    return new DocumentRef(this, docID)
  }

  /**
   * 新增 一篇文档，当 data 不为 array 时
   *      多篇文档，当 data 为 array 时
   */
  public add(data: any) {

    if(!data) {
      throw new Error("使用 add 时，请传参 object 或 array")
    }

    let docRef = new DocumentRef(this)
    return docRef.create(data)
  }

  /**
   * 聚合操作
   * @description 该方法目前待实现
   */
  public aggregate() {

  }

  

}