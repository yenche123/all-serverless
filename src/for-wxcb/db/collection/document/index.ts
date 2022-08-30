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
import { WxcbDocGetRes, WxcbDocSetRes, WxcbDocUpdateRes } from "../../../type"

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

  /**
   * 获取记录数据
   */
  async get(): Promise<WxcbDocGetRes> {
    const t = this.target
    let tmp: any;
    let res: any;
    if(t === SdkType.LAF) {
      tmp = await this.lafDoc?.get()
      res = {
        data: tmp.data,
        errMsg: sdkCha.WXCB.errMsg_doc_get_ok,
      }
    }
    else if(t === SdkType.TCB) {
      tmp = await this.tcbDoc?.get()
      res = {
        data: tmp.data,
        errMsg: sdkCha.WXCB.errMsg_doc_get_ok
      }
    }
    else if(t === SdkType.WXCB) {
      res = await this.wxcbDoc?.get()
    }
    return res as WxcbDocGetRes
  }

  /**
   * 创建或添加数据
   */
  async set(opt: { data: any }): Promise<WxcbDocSetRes> {
    const t = this.target
    let tmp: any;
    let res: any;
    if(t === SdkType.LAF) {
      tmp = await this.lafDoc?.set(opt.data)
      res = {
        _id: tmp.upsertId ?? this.id,
        stats: {
          created: tmp.updated === 0 ? 1 : 0,
          updated: tmp.updated,
        },
        errMsg: sdkCha.WXCB.errMsg_doc_set_ok
      }
    }
    else if(t === SdkType.TCB) {
      // 如果文档原来存在，返回
      //    { updated: 1, upsertedId: null, requestId: xxxxx }
      // 如果文档原来不存在，则返回
      //    { updated: 0, upsertedId: string, requestId: xxxx }
      tmp = await this.tcbDoc?.set(opt.data)
      res = {
        _id: tmp.upsertedId ?? this.id,
        stats: {
          created: tmp.updated === 1 ? 0 : 1,
          updated: tmp.updated,
        },
        errMsg: sdkCha.WXCB.errMsg_doc_set_ok
      }
    }
    else if(t === SdkType.WXCB) {
      res = await this.wxcbDoc?.set(opt) as WxcbDocSetRes
    }
    return res
  }

  /**
   * 更新一条记录
   *   如果没有找到对应的 docID 使之更新 会正常响应
   *   只不过 stats.updated: 0
   */
  async update(opt: { data: any }): Promise<WxcbDocUpdateRes> {
    const t = this.target
    let tmp: any;
    let res: any;
    if(t === SdkType.LAF) {
      tmp = await this.lafDoc?.update(opt.data)
      res = {
        stats: {
          updated: tmp.updated ?? 0,
        },
        errMsg: sdkCha.WXCB.errMsg_doc_update_ok
      }
    }
    else if(t === SdkType.TCB) {
      tmp = await this.tcbDoc?.update(opt.data)
      res = {
        stats: {
          updated: tmp.updated ?? 0,
        },
        errMsg: sdkCha.WXCB.errMsg_doc_update_ok
      }
    }
    else if(t === SdkType.WXCB) {
      res = await this.wxcbDoc?.update(opt) as WxcbDocUpdateRes
    }
    return res
  }

  /**
   * 删除一条记录
   */
  async remove() {
    
  }

}

export { DocumentRef }