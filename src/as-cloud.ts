import { TotalConfig, SdkType } from "./types";
import { CallFunctionParam } from "./types/cloud";
import { RequireSth } from "./utils/type-tool"
import { callFunction } from "./functions"
import tcb, { CloudBase } from "@cloudbase/node-sdk";
import { Cloud as LafCloud } from "laf-client-sdk"
import wxcb from "wx-server-sdk"

type AsCloudCfg = RequireSth<TotalConfig, "targetSdk">

class AsCloud {

  public target: SdkType
  private config: AsCloudCfg

  private tcbApp?: CloudBase
  private lafApp?: LafCloud

  public constructor(config: TotalConfig) {
    this.target = config.targetSdk ?? SdkType.LAF

    let _c: AsCloudCfg = {
      targetSdk: this.target,
    }

    if(_c.targetSdk === SdkType.LAF) {
      _c.lafConfig = config.lafConfig
      if(_c.lafConfig) {
        this.lafApp = new LafCloud(_c.lafConfig)
      }
      else {
        throw new Error("初始化时，请传参 lafConfig.........")
      }
    }
    else if(_c.targetSdk === SdkType.TCB) {
      _c.tcbConfig = config.tcbConfig
      this.tcbApp = tcb.init(config.tcbConfig)
    }
    else if(_c.targetSdk === SdkType.WXCB) {
      _c.wxcbConfig = config.wxcbConfig
      wxcb.init(config.wxcbConfig)
    }
    else if(_c.targetSdk === SdkType.SUPABASE) {
      _c.supabaseConfig = config.supabaseConfig
    }

    this.config = _c
  }

  public getTcbApp() {
    return this.tcbApp
  }

  public getWxcbInstance() {
    return wxcb
  }

  public getLafApp() {
    return this.lafApp
  }
  
  public callFunction<T = any>(opt: CallFunctionParam): Promise<T> {
    return callFunction(this, opt)
  }

}

export { AsCloud }