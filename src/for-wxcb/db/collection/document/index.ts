import { Collection } from "../index"
import { SdkType } from "../../../../type"
import { 
  LAF_DOC, 
  TCB_DOC, 
  WXCB_DOC, 
  WXCB_DDD, 
  LAF_COL, 
  TCB_COL, 
  WXCB_COL,
  LafAddRes, 
  WxcbAddRes, 
  TcbAddRes
} from "../../../../type/external"
import check from "../../../../utils/check"
import { sdkCha } from "../../../../some-characteristic"

class DocumentRef {

  public target: SdkType

  private _col: Collection

  public lafDoc?: LAF_DOC
  public tcbDoc?: TCB_DOC
  public wxcbDoc?: WXCB_DOC

  readonly id?: string | number

  constructor(col: Collection, docId?: string | number) {
    let t = col.target
    this.target = t
    this._col = col
    this.id = docId

    if(t === SdkType.LAF && docId) {
      this.lafDoc = col.lafCol?.doc(docId)
    }
    else if(t === SdkType.TCB && docId) {
      this.tcbDoc = col.tcbCol?.doc(docId)
    }
    else if(t === SdkType.WXCB && docId) {
      this.wxcbDoc = col.wxcbCol?.doc(docId)
    }
  }

  /**
   * 在业务层使用 collection(colName).add({ data: {} })
   */
  async create(param: WXCB_DDD.IAddDocumentOptions): Promise<WxcbAddRes | void> {
    let t = this.target

    let col = this._col
    let tmp: any;
    let data = param.data;

    if(t === SdkType.LAF) {
      let lafCol = col.lafCol as LAF_COL
      let tmpLaf: LafAddRes
      let errMsg: string = sdkCha.WXCB.errMsg_add_ok

      if(check.isArray(data)) {
        let _ids = []
        for(let i=0; i<(data as any[]).length; i++) {
          let v = data[i]
          tmpLaf = await lafCol.add(v)
          if(tmpLaf.id) _ids.push(tmpLaf.id)
          if(tmpLaf.error) errMsg = tmpLaf.error
        }
        return { _ids, errMsg }
      }
      else {
        tmpLaf = await lafCol.add(data)
        if(tmpLaf.error) errMsg = tmpLaf.error
        return { _id: tmpLaf.id, errMsg }
      }
    }
    else if(t === SdkType.TCB) {
      let tcbCol = col.tcbCol as TCB_COL
      let tmpTcb: TcbAddRes
      tmpTcb = await tcbCol.add(data)
      if(tmpTcb.id) {
        tmp._id = tmpTcb.id
      }
      if(tmpTcb.ids) {
        tmp._ids = [...tmpTcb.ids]
      }
      tmp.errMsg = sdkCha.WXCB.errMsg_add_ok
      return tmp
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = col.wxcbCol as WXCB_COL
      let tmpWxcb: WxcbAddRes
      tmpWxcb = (await wxcbCol.add(param)) as WxcbAddRes
      return tmpWxcb
    }
  }

}

export { DocumentRef }