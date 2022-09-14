// faas.ts
// 主要处理云函数侧
// 1. 当前云函数运行的云厂商
// 2. 当前环境判断
// 3. 入参提取
// 4. 自定义环境变量提取

import { FaaSManufacturer } from "../type"
import valTool from "../utils/val-tool"

let manufacturer: FaaSManufacturer = ""

// 获取当前云函数所部署在的云厂商
function getFaaSManufacturer(param1: any, param2?: any): FaaSManufacturer {
  if(manufacturer) return manufacturer

  // 判断是否为 lafyun
  if(param1 && param1.headers) {
    const host1 = param1.headers.host || ""
    const isLafyun = host1.includes(".lafyun.com")
    if(isLafyun) {
      manufacturer = "lafyun"
      return manufacturer
    }
  }

  // 判断是否为腾讯云 scf
  if(param2) {
    if(param2.tencentcloud_region && param2.tencentcloud_appid) return "tencent-scf"
  }
  
  return ""
}

/**
 * 统一获取开发者自定义的入参。
 * 当云函数部署在：
 *   lafyun 时，入参为 ctx.body
 *   tencent-scf 事件触发时，入参为 event
 *   tencent-scf http触发时，入参为 JSON.parse(event.body)
 * 为方便开发者减少判断当前环境，故新增 getEntryData() 方法来统一获取自定义入参
 * 如果判别环境识别，将会回传一个 {}
 * @param param1 请传入云函数主函数的形参1，即 exports.main = async (event, context) => {} 的 event
 * @param param2 （选填）传入云函数主函数的形参2，即 exports.main = async (event, context) => {} 的 context
 */
function getEntryData(param1: any, param2?: any): Record<string, any> {
  const m = getFaaSManufacturer(param1, param2)

  // 如果为 lafyun
  if(m === "lafyun") {
    if(!param1) return {}
    if(param1.body) {
      const tmp1 = valTool.objToStr(param1.body)
      if(tmp1 !== "{}") return param1.body
    }
    if(param1.query) return param1.query
    return {}
  }

  // 如果为 tencent-scf
  if(m === "tencent-scf") {
    if(!param1) return {}

    // http 触发时
    if(param1.httpMethod && param1.body && param1.headers?.requestsource === "APIGW") {
      if(typeof param1.body === "string") {
        let b1 = valTool.strToObj(param1.body)
        return b1
      }
      return param1.body
    }

    return param1
  }

  return {}
}



export default {
  getFaaSManufacturer,
  getEntryData,
}




