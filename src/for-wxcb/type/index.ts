/**
 * 本文件所定义的返回类型
 * 皆为实测后的结果
 */


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

// doc.get() 值得注意的是 查无 doc wx-server-sdk 是直接 throw error
type WxcbDocGetRes = {
  data: any
  errMsg: string
}

type WxcbDocSetRes = {
  _id: number | string
  stats: {
    created: number
    updated: number
  }
  errMsg: string
}

type WxcbDocUpdateRes = {
  stats: {
    updated: number
  }
  errMsg: string
}

type WxcbDocRemoveRes = {
  stats: {
    removed: number
  }
  errMsg: string
}

export {
  WxcbCreateCollectionRes,
  WxcbAggregateEndRes,
  WxcbDocGetRes,
  WxcbDocSetRes,
  WxcbDocUpdateRes,
  WxcbDocRemoveRes,
}