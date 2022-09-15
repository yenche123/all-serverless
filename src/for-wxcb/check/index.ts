import { InitConfig, SdkType } from "../../type"

const checkEntryParamForInit = (cfg: InitConfig): boolean => {
  let t = cfg.targetSdk
  if(!t) {
    throw new Error("init() 必须指定 targetSdk 属性")
  }

  if(t === SdkType.LAF && !cfg.lafConfig && !cfg.lafCloudSdk) {
    throw new Error("当 targetSdk 为 SdkType.LAF 时，必须指定 lafConfig 或 lafCloudSdk")
  }

  if(t === SdkType.TCB && !cfg.tcbConfig) {
    throw new Error("当 targetSdk 为 SdkType.TCB 时，必须指定 tcbConfig")
  }

  if(t === SdkType.WXCB && !cfg.wxcbConfig) {
    throw new Error("当 targetSdk 为 SdkType.WXCB 时，必须指定 wxcbConfig")
  }

  return true
}

export default {
  checkEntryParamForInit,
}