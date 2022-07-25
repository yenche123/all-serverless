import { SdkType } from "../../type"
import { Cloud } from "../cloud"
import { WXCB_CLOUD } from "../../type/external"

type CallFuncRes = WXCB_CLOUD.CallFunctionResult | void

export async function callFunction(cloud: Cloud, option: WXCB_CLOUD.CallFunctionParam): Promise<CallFuncRes> {
  let t = cloud.target

  if(t === SdkType.LAF) {
    return await handle_laf(cloud, option)
  }
  else if(t === SdkType.TCB) {
    return await handle_tcb(cloud, option)
  }
  else if(t === SdkType.WXCB) {
    return await handle_wxcb(cloud, option)
  }
}

async function handle_laf(cloud: Cloud, option: WXCB_CLOUD.CallFunctionParam): Promise<CallFuncRes> {
  let lafCloud = cloud.lafCloud
  let res = await lafCloud?.invokeFunction(option.name, option.data)
  return {
    result: res,
    errMsg: "",
    requestID: "The requestID is not supported by Laf invokeFunction()",
  }
}

async function handle_tcb(cloud: Cloud, option: WXCB_CLOUD.CallFunctionParam): Promise<CallFuncRes> {
  let tcbCloud = cloud.tcbCloud
  let callFuncParam = { ...option, data: option.data ?? {} }
  let resFromTcb = await tcbCloud?.callFunction(callFuncParam)
  let res: WXCB_CLOUD.CallFunctionResult = {
    result: resFromTcb?.result,
    requestID: resFromTcb?.requestId,
    //@ts-ignore
    errMsg: resFromTcb?.message ?? "",
  }
  return res
}

async function handle_wxcb(cloud: Cloud, option: WXCB_CLOUD.CallFunctionParam): Promise<CallFuncRes> {
  let wxcbCloud = cloud.wxcbCloud
  return await wxcbCloud.callFunction(option)
}


