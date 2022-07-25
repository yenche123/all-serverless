import { InitConfig, SdkType } from "../type"
import { TcbCloud, LafCloud, WXCB_ICloud, wxcb, tcb } from "../type/external"
import { callFunction } from "./functions"
class Cloud {

  public target: SdkType

  public tcbCloud?: TcbCloud
  public lafCloud?: LafCloud
  public wxcbCloud = wxcb

  constructor(cfg: InitConfig) {
    let t = cfg.targetSdk
    if(!t) {
      throw new Error("必须指定 targetSdk")
    }

    this.target = t
    
    if(t === SdkType.LAF) {
      if(cfg.lafConfig) {
        this.lafCloud = new LafCloud(cfg.lafConfig)
      }
    }
    else if(t === SdkType.TCB) {
      this.tcbCloud = tcb.init(cfg.tcbConfig)
    }
    else if(t === SdkType.WXCB) {
      wxcb.init(cfg.wxcbConfig)
    }
  }

  public callContainer(options: any) {
    let promise;
    try {
      //@ts-ignore
      promise = wxcb.callContainer(options)
    }
    catch(err) {}
    return promise
  }

  public callFunction(opt: WXCB_ICloud.CallFunctionParam) {
    return callFunction(this, opt)
  }

}

export { Cloud }