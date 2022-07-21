


interface BaseRes {
  requestId: string
  ok?: number
}

export interface AddRes extends BaseRes {
  id?: string
  ids?: string[]
  inserted?: number
}