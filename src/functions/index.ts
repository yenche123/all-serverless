import { AsCloud } from "../as-cloud";
import { SdkType } from "../types";
import { CallFunctionParam } from "../types/cloud";
import { Cloud as LafCloud } from "laf-client-sdk"
import { CloudBase, ICallFunctionOptions as TcbCallFuncOpt } from "@cloudbase/node-sdk";
import util from "../utils/val-tool"

export async function callFunction(asCloud: AsCloud, option: CallFunctionParam): Promise<any> {

  let app: any;
  let res: any;
  let tmp: any;
  let t = asCloud.target
  if(t === SdkType.LAF) {
    app = asCloud.getLafApp() as LafCloud
    res = await (app as LafCloud).invokeFunction(option.name, option.data)
    tmp = {
      result: res,
      requestId: "The requestId is not supported by Laf invokeFunction()"
    }
    return tmp
  }
  else if(t === SdkType.TCB) {
    app = asCloud.getTcbApp() as CloudBase
    let newOpt: TcbCallFuncOpt = { ...option, data: option.data ?? {} }
    res = await (app as CloudBase).callFunction(newOpt)
    return res
  }
  else if(t === SdkType.WXCB) {
    app = asCloud.getWxcbInstance()
    res = await app.callFunction(option)
    tmp = {
      result: res.result,
      requestId: res.requestID,
    }
    return tmp
  }
  
  await util.waitMilli(0)
  return {}
}