import { SdkType } from "../../../../type";
import { LafAgg, TcbAgg, WxcbAgg } from "../../../../type/external";
import { Collection } from "../index";


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

}

export { Aggregate }