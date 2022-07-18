/**
 * 原业务代码写法为微信云开发时，导入这个文件
 * @author yenche123
 * @createdAt 2022-07-18
 */

import wxcloud from "wx-server-sdk"
import {
  ICloud
} from "wx-server-sdk"
import { AsCloud } from "../as-cloud"
import { TotalConfig } from "../types"
import { CallFunctionResult } from "../types/cloud"

let debug: boolean
let hasInited: boolean
let asCloud: AsCloud


/**
 * 将根据
 *   https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/Cloud.html
 * 开始一一适配
 */

/**
 * 原 cloud 下的属性皆与微信直接继承，故不做任何适配
 */
export const DYNAMIC_CURRENT_ENV = wxcloud.DYNAMIC_CURRENT_ENV
export const openapi = wxcloud.openapi
//@ts-ignore
export const cloudPay = wxcloud.cloudPay

export const init = (opt: TotalConfig): void => {
  hasInited = true
  asCloud = new AsCloud(opt)
  if(opt.debug) debug = true

  // 也尝试初始化 wxcloud 毕竟可能会用到集成的 getWXContext()
  // 这些方法都必须先初始化 wxcloud 才可使用
  try {
    wxcloud.init(opt.wxcbConfig)
  }
  catch(err) {
    console.log("初始化遇到问题.......")
  }
}

export const callContainer = (options: any) => {
  if(debug) {
    console.warn("callContainer 不会进行转换")
    console.warn("而是直接调用原 wx-server-sdk 的方法.....")
  }

  let promise;
  try {
    //@ts-ignore
    promise = wxcloud.callContainer(options)
  }
  catch(err) {}
  return promise
}

export const callFunction = async (opt: ICloud.CallFunctionParam): Promise<ICloud.CallFunctionResult | void> => {
   let res: CallFunctionResult = await asCloud.callFunction(opt)
   let res2: ICloud.CallFunctionResult = {
    result: res.result,
    requestID: res.requestId,
    errMsg: res.errMsg ?? "",
   }
   return res2
}

/**
 * 会尝试直接调用原生 wx-server-sdk 的方法
 */
export const getWXContext = () => {
  if(debug) {
    console.warn("getWXContext 不会进行转换")
    console.warn("而是直接调用原 wx-server-sdk 的方法.....")
  }
  return wxcloud.getWXContext()
}
