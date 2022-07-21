
// 外部 sdk 引入
import tcb, { CloudBase } from "@cloudbase/node-sdk";
import { Cloud as LafCloud } from "laf-client-sdk"
import wxcb from "wx-server-sdk"

// 内部 sdk
import { TotalConfig, AsCloudCfg, SdkType } from "./types"
import { CallFunctionParam, DatabaseParam } from "./types/cloud"
import { callFunction } from "./functions"
import { Db } from "./db"
import valTool from "./utils/val-tool"

class AsCloud {

  public origin: SdkType
  public target: SdkType
  private config: AsCloudCfg

  private tcbApp?: CloudBase
  private lafApp?: LafCloud

  public constructor(config: TotalConfig) {
    this.target = config.targetSdk ?? SdkType.LAF
    this.origin = config.originStyle ?? SdkType.WXCB

    let _c: AsCloudCfg = {
      targetSdk: this.target,
      originStyle: this.origin,
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

  public database(opt?: DatabaseParam) {
    return new Db(this, opt)
  }

}

export { AsCloud }