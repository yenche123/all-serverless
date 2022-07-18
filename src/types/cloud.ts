


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