// 因为 Query 是 Collection 的基类，故放到跟 collection/index.ts 同级，而非它的子文件夹

import { Db } from "../index"
import { SdkType } from "../../../type"
import { LAF_COL, LAF_QRY, TCB_COL, TCB_QRY, WXCB_COL, WXCB_DDD, WXCB_QRY } from "../../../type/external"
import { sdkCha } from "../../../some-characteristic"


interface AllQuerys {
  lafQry?: LAF_QRY
  tcbQry?: TCB_QRY
  wxcbQry?: WXCB_QRY
}

type OrderByParam2 = "asc" | "desc"
interface LafProjectionType {
  [field: string]: 0 | 1
}

class Query {

  protected _db: Db
  protected _colName: string
  public readonly collectionName: string

  public target: SdkType

  public lafCol?: LAF_COL
  public tcbCol?: TCB_COL
  public wxcbCol?: WXCB_COL

  public lafQry?: LAF_QRY
  public tcbQry?: TCB_QRY
  public wxcbQry?: WXCB_QRY

  constructor(db: Db, colName: string, allQrys?: AllQuerys) {
    this._db = db
    this._colName = colName
    this.collectionName = colName

    let t = db.target
    this.target = t

    if(t === SdkType.LAF) {
      if(allQrys?.lafQry) this.lafQry = allQrys.lafQry
      else this.lafCol = db.lafDb?.collection(colName)
    }
    else if(t === SdkType.TCB) {
      if(allQrys?.tcbQry) this.tcbQry = allQrys.tcbQry
      else this.tcbCol = db.tcbDb?.collection(colName)
    }
    else if(t === SdkType.WXCB) {
      if(allQrys?.wxcbQry) this.wxcbQry = allQrys.wxcbQry
      else this.wxcbCol = db.wxcbDb?.collection(colName)
    }
  }

  /**
   * 发起远程请求: 查询集合数据
   */
  async get(): Promise<WXCB_DDD.IQueryResult | void> {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      let res = lafQry ? await lafQry.get() : await lafCol.get()
      let res2 = { ...res, errMsg: sdkCha.WXCB.errMsg_get_ok }
      return res2
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbCol as TCB_QRY
      let res = tcbQry ? await tcbQry.get() : await tcbCol.get()
      let res2 = { ...res, errMsg: sdkCha.WXCB.errMsg_get_ok }
      return res2
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      let res = wxcbQry ? await wxcbQry.get() : await wxcbCol.get()
      return res as WXCB_DDD.IQueryResult
    }
  }

  /**
   * 发起远程请求: 查询数量
   */
  async count(): Promise<WXCB_DDD.ICountResult | void> {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      let res = lafQry ? await lafQry.count() : await lafCol.count()
      let res2: WXCB_DDD.ICountResult = {
        total: res.total,
        errMsg: sdkCha.WXCB.errMsg_count_ok,
      }
      return res2
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbCol as TCB_QRY
      let res = tcbQry ? await tcbQry.count() : await tcbCol.count()
      let res2 = {
        total: res.total ?? 0,
        errMsg: sdkCha.WXCB.errMsg_count_ok,
      }
      return res2
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      let res = wxcbQry ? await wxcbQry.count() : await wxcbCol.count()
      return res as WXCB_DDD.ICountResult
    }
  }


  /**
   * 发起远程请求: 批量更新
   */
  async update(options: WXCB_DDD.IUpdateDocumentOptions): Promise<WXCB_DDD.IUpdateResult | void> {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      let res = lafQry ? await lafQry.update(options.data) : await lafCol.update(options.data)
      let res2 = {
        errMsg: sdkCha.WXCB.errMsg_update_ok,
        stats: {
          updated: res.updated
        }
      }
      return res2
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbCol as TCB_QRY
      let res = tcbQry ? await tcbQry.update(options.data) : await tcbCol.update(options.data)
      let res2 = {
        errMsg: sdkCha.WXCB.errMsg_update_ok,
        stats: {
          updated: res.updated ?? 0,
        }
      }
      return res2
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      let res = wxcbQry ? await wxcbQry.update(options) : await wxcbCol.update(options)
      return res
    }
  }

  /**
   * 发起远程请求: 批量删除
   */
  async remove(options?: WXCB_DDD.IRemoveDocumentOptions): Promise<WXCB_DDD.IRemoveResult | void> {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      let res = lafQry ? await lafQry.remove() : await lafCol.remove()
      let res2 = {
        errMsg: sdkCha.WXCB.errMsg_remove_ok,
        stats: {
          removed: res.deleted
        }
      }
      return res2
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbCol as TCB_QRY
      let res = tcbQry ? await tcbQry.remove() : await tcbCol.remove()
      let deleted = Number(res.deleted)
      let res2 = {
        errMsg: sdkCha.WXCB.errMsg_remove_ok,
        stats: {
          removed: isNaN(deleted) ? 0 : deleted
        }
      }
      return res2
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      let res = wxcbQry ? await wxcbQry.remove(options) : await wxcbCol.remove(options)
      return res
    }
  }

  /**
   * 设置查询条件
   */
  public where(query: WXCB_DDD.IQueryCondition): Query | void {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      lafQry = lafQry ? lafQry.where(query) : lafCol.where(query)
      return new Query(this._db, this._colName, { lafQry })
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbQry as TCB_QRY
      tcbQry = tcbQry ? tcbQry.where(query) : tcbCol.where(query)
      return new Query(this._db, this._colName, { tcbQry })
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      wxcbQry = wxcbQry ? wxcbQry.where(query) : wxcbCol.where(query)
      return new Query(this._db, this._colName, { wxcbQry })
    }
  }

  /**
   * 设置查询结果的数量上限
   */
  public limit(value: number): Query | void {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      lafQry = lafQry ? lafQry.limit(value) : lafCol.limit(value)
      return new Query(this._db, this._colName, { lafQry })
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbQry as TCB_QRY
      tcbQry = tcbQry ? tcbQry.limit(value) : tcbCol.limit(value)
      return new Query(this._db, this._colName, { tcbQry })
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      wxcbQry = wxcbQry ? wxcbQry.limit(value) : wxcbCol.limit(value)
      return new Query(this._db, this._colName, { wxcbQry })
    }
  }

  /**
   * 设置查询排序条件
   */
  public orderBy(fieldPath: string, order: OrderByParam2): Query | void {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      lafQry = lafQry ? lafQry.orderBy(fieldPath, order) : lafCol.orderBy(fieldPath, order)
      return new Query(this._db, this._colName, { lafQry })
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbQry as TCB_QRY
      tcbQry = tcbQry ? tcbQry.orderBy(fieldPath, order) : tcbCol.orderBy(fieldPath, order)
      return new Query(this._db, this._colName, { tcbQry })
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      wxcbQry = wxcbQry ? wxcbQry.orderBy(fieldPath, order) : wxcbCol.orderBy(fieldPath, order)
      return new Query(this._db, this._colName, { wxcbQry })
    }
  }

  public skip(offset: number): Query | void {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      lafQry = lafQry ? lafQry.skip(offset) : lafCol.skip(offset)
      return new Query(this._db, this._colName, { lafQry })
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbQry as TCB_QRY
      tcbQry = tcbQry ? tcbQry.skip(offset) : tcbCol.skip(offset)
      return new Query(this._db, this._colName, { tcbQry })
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      wxcbQry = wxcbQry ? wxcbQry.skip(offset) : wxcbCol.skip(offset)
      return new Query(this._db, this._colName, { wxcbQry })
    }
  }

  /**
   * 设置要 返回 / 不返回 的字段
   */
  public field(projection: Record<string, boolean | 1 | -1>): Query | void {
    let t = this.target
    if(t === SdkType.LAF) {
      let lafCol = this.lafCol as LAF_COL
      let lafQry = this.lafQry as LAF_QRY
      let proj2: LafProjectionType = {}
      for(let key in projection) {
        let val = projection[key]
        if(val === true || val === 1) proj2[key] = 1
        else proj2[key] = 0
      }
      lafQry = lafQry ? lafQry.field(proj2) : lafCol.field(proj2)
      return new Query(this._db, this._colName, { lafQry })
    }
    else if(t === SdkType.TCB) {
      let tcbCol = this.tcbCol as TCB_COL
      let tcbQry = this.tcbQry as TCB_QRY
      tcbQry = tcbQry ? tcbQry.field(projection) : tcbCol.field(projection)
      return new Query(this._db, this._colName, { tcbQry })
    }
    else if(t === SdkType.WXCB) {
      let wxcbCol = this.wxcbCol as WXCB_COL
      let wxcbQry = this.wxcbQry as WXCB_QRY
      wxcbQry = wxcbQry ? wxcbQry.field(projection) : wxcbCol.field(projection)
      return new Query(this._db, this._colName, { wxcbQry })
    }
  }

}

export { Query }