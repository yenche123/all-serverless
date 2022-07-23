import { InitConfig, SdkType } from "../type"
import { wxcb, WXCB_DB, WXCB_ICloud } from "../type/external"
import check from "./check"
import { Cloud } from "./cloud"

let debug: boolean
let cloud: Cloud

const DYNAMIC_CURRENT_ENV = wxcb.DYNAMIC_CURRENT_ENV
const openapi = wxcb.openapi
//@ts-ignore
const cloudPay = wxcb.cloudPay

function init(cfg: InitConfig) {
  // 检测
  check.checkEntryParamForInit(cfg)
  if(cfg.debug) debug = true
  cloud = new Cloud(cfg)
}

function callContainer(options: any) {
  if(debug) {
    console.warn("callContainer 不会进行转换")
    console.warn("而是直接调用原 wx-server-sdk 的方法.....")
  }

  return cloud.callContainer(options)
}

async function callFunction(opt: WXCB_ICloud.CallFunctionParam): Promise<WXCB_ICloud.CallFunctionResult | void> {
  return cloud.callFunction(opt)
}

function database(opt?: WXCB_DB.IDatabaseConfig) {

}

function getWXContext() {
  if(debug) {
    console.warn("getWXContext 不会进行转换")
    console.warn("而是直接调用原 wx-server-sdk 的方法.....")
  }
  return wxcb.getWXContext()
}

export default {
  DYNAMIC_CURRENT_ENV,
  openapi,
  cloudPay,
  init,
  database,
  callContainer,
  callFunction,
  getWXContext,
}

