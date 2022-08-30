
// db.createCollection()
type WxcbCreateCollectionRes = {
  requestId?: string   // 实测微信云开发 创建集合的接口 返回的是 requestId 而不是 requestID
  errMsg: string       // 默认为 createCollection:ok
}

// db.collection().aggregate().Xxxx().end()
// 实测 聚合操作的返回 没有 requestId
type WxcbAggregateEndRes = {
  list: any[]
  errMsg: string
}

export {
  WxcbCreateCollectionRes,
  WxcbAggregateEndRes,
}