import { InitConfig, SdkType } from "../type"
import { TcbCloud, LafCloud, WXCB_CLOUD, wxcb, tcb, WXCB_DDD } from "../type/external"
import { callFunction } from "./functions"
import { Db } from "./db"
class Cloud {

  public target: SdkType
  public debug: boolean

  public tcbCloud?: TcbCloud
  public lafCloud?: LafCloud
  public wxcbCloud = wxcb

  constructor(cfg: InitConfig) {
    let t = cfg.targetSdk
    if(!t) {
      throw new Error("必须指定 targetSdk")
    }

    this.target = t
    this.debug = cfg.debug ?? false
    
    if(t === SdkType.LAF) {
      if(cfg.lafCloudSdk) {
        this.lafCloud = cfg.lafCloudSdk
      }
      else if(cfg.lafConfig) {
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

  public callFunction(opt: WXCB_CLOUD.CallFunctionParam) {
    return callFunction(this, opt)
  }

  public database(opt?: WXCB_DDD.IDatabaseConfig) {
    return new Db(this, opt, this.debug)
  }

  public getWXContext() {
    return wxcb.getWXContext()
  }

}

export { Cloud }