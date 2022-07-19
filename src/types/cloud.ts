// 定义 AsCloud 类型下各个方法 入参和出参的接口

export interface CallFunctionParam {
  name: string
  data?: Record<string, any>
  [propName: string]: any
}

export interface CallFunctionResult {
  requestId: string,
  result: any,
  [propName: string]: any,
}

export interface DatabaseParam {
  env?: string
}

