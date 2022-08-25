import { SdkType } from "../../../../type";
import { LafAgg, TcbAgg, WxcbAgg } from "../../../../type/external";
import { Collection } from "../index";
import { sdkCha } from "../../../../some-characteristic"

class Aggregate {

  public target: SdkType

  public lafAgg?: LafAgg
  public tcbAgg?: TcbAgg
  public wxcbAgg?: WxcbAgg

  constructor(col: Collection) {
    let t = col.target
    this.target = t

    if(t === SdkType.LAF) {
      this.lafAgg = col.lafCol?.aggregate()
    }
    else if(t === SdkType.TCB) {
      this.tcbAgg = col.tcbCol?.aggregate()
    }
    else if(t === SdkType.WXCB) {
      this.wxcbAgg = col.wxcbCol?.aggregate()
    }
  }

  _pipe(stage: string, param: any) {
    const t = this.target
    if(t === SdkType.LAF) {
      this.lafAgg = this.lafAgg?._pipe(stage, param)
    }
    else if(t === SdkType.TCB) {
      this.tcbAgg = this.tcbAgg?._pipe(stage, param)
    }
    else if(t === SdkType.WXCB) {
      //@ts-ignore
      this.wxcbAgg = this.wxcbAgg?.pushStage(stage, param)
    }
    return this
  }

  async end() {
    let t = this.target
    let tmp: any;
    if(t === SdkType.LAF) {
      tmp = await this.lafAgg?.end()
      if(tmp && tmp.data) {
        if(tmp.data) {
          tmp.list = tmp.data
          delete tmp.data
        }
        if(tmp.error) {
          tmp.errMsg = tmp.error
          delete tmp.error
        }
        else {
          tmp.errMsg = sdkCha.WXCB.errMsg_aggregate_ok
        }
      }
      return tmp
    }
    else if(t === SdkType.TCB) {
      let res = await this.tcbAgg?.end()
      if(res && res.data) {
        res.list = res.data
        delete res.data
        res.errMsg = sdkCha.WXCB.errMsg_aggregate_ok
      }
      return res
    }
    else if(t === SdkType.WXCB) {
      let res = await this.wxcbAgg?.end()
      return res
    }
  }

  addFields(param: any) {
    return this._pipe('addFields', param)
  }

  bucket(param: any) {
    return this._pipe('bucket', param)
  }

  bucketAuto(param: any) {
    return this._pipe('bucketAuto', param)
  }

  count(param: any) {
    return this._pipe('count', param)
  }

  geoNear(param: any) {
    const t = this.target
    if(t === SdkType.LAF) {
      this.lafAgg = this.lafAgg?.geoNear(param)
    }
    else if(t === SdkType.TCB) {
      this.tcbAgg = this.tcbAgg?.geoNear(param)
    }
    else if(t === SdkType.WXCB) {
      this.wxcbAgg = this.wxcbAgg?.geoNear(param)
    }
    return this
  }

  group(param: any) {
    return this._pipe('group', param)
  }

  limit(param: any) {
    return this._pipe('limit', param)
  }

  match(param: any) {
    const t = this.target
    if(t === SdkType.LAF) {
      this.lafAgg = this.lafAgg?.match(param)
    }
    else if(t === SdkType.TCB) {
      this.tcbAgg = this.tcbAgg?.match(param)
    }
    else if(t === SdkType.WXCB) {
      this.wxcbAgg = this.wxcbAgg?.match(param)
    }
    return this
  }

  project(param: any) {
    return this._pipe('project', param)
  }

  lookup(param: any) {
    return this._pipe('lookup', param)
  }

  replaceRoot(param: any) {
    return this._pipe('replaceRoot', param)
  }

  // 其中 size 必须为正整数
  sample(param: { size: number }) {
    return this._pipe('sample', param)
  }

  skip(val: number) {
    return this._pipe('skip', val)
  }

  /**
   * 排序
   *  1: 升序（从小到大）
   *  -1: 降序（从大到小）
   */
  sort(param: Record<string, 1 | -1>) {
    return this._pipe('sort', param)
  }

  sortByCount(param: any) {
    return this._pipe('sortByCount', param)
  }

  unwind(param: any) {
    return this._pipe('unwind', param)
  }

}

export { Aggregate }