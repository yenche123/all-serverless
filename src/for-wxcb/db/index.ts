import { WXCB_DDD, LAF_DB, TCB_DDD } from "../../type/external";
import { Cloud } from "../cloud";
import { SdkType } from "../../type"
import { Collection } from "./collection";
import { createCollection } from "./createCollection"
import { runTransaction, startTransaction, RunTranParam1 } from "./transaction"

interface ServerDateParam {
  offset: number
}

interface RegExpParam {
  regexp: string
  options: string
}

class Db {

  public target: SdkType
  public debug: boolean

  public lafDb?: LAF_DB
  public tcbDb?: TCB_DDD.Db
  public wxcbDb?: WXCB_DDD.Database

  constructor(cloud: Cloud, opt?: WXCB_DDD.IDatabaseConfig, debug: boolean = false) {
    let t = cloud.target
    this.target = t
    this.debug = debug

    if(t === SdkType.LAF) {
      let lafCloud = cloud.lafCloud
      this.lafDb = lafCloud?.database()
    }
    else if(t === SdkType.TCB) {
      let tcbCloud = cloud.tcbCloud
      this.tcbDb = tcbCloud?.database(opt)
    }
    else if(t === SdkType.WXCB) {
      let wxcbCloud = cloud.wxcbCloud
      this.wxcbDb = wxcbCloud?.database(opt)
    }
  }

  public collection(name: string) {
    return new Collection(this, name)
  }

  /**
   * 注意：返回所连接云厂商的 command
   */
  get command() {
    let t = this.target
    if(t === SdkType.LAF) {
      return this.lafDb?.command
    }
    else if(t === SdkType.TCB) {
      return this.tcbDb?.command
    }
    else if(t === SdkType.WXCB) {
      return this.wxcbDb?.command
    }
  }

  /**
   * 注意：返回所连接云厂商的 Geo
   */
  get Geo() {
    let t = this.target
    if(t === SdkType.LAF) {
      return this.lafDb?.Geo
    }
    else if(t === SdkType.TCB) {
      return this.tcbDb?.Geo
    }
    else if(t === SdkType.WXCB) {
      return this.wxcbDb?.Geo
    }
  }

  /**
   * 注意：返回所连接云厂商的 serverDate
   */
  public serverDate(opt: ServerDateParam = { offset: 0 }) {
    let t = this.target
    if(t === SdkType.LAF) {
      return this.lafDb?.serverDate(opt)
    }
    else if(t === SdkType.TCB) {
      return this.tcbDb?.serverDate(opt)
    }
    else if(t === SdkType.WXCB) {
      //@ts-ignore
      return this.wxcbDb?.serverDate(opt)
    }
  }

  /**
   * 注意：返回所连接云厂商的 RegExp
   */
  public RegExp(opt: RegExpParam) {
    let t = this.target
    if(t === SdkType.LAF) {
      return this.lafDb?.RegExp(opt)
    }
    else if(t === SdkType.TCB) {
      return this.tcbDb?.RegExp(opt)
    }
    else if(t === SdkType.WXCB) {
      return this.wxcbDb?.RegExp(opt)
    }
  }

  public createCollection(collName: string) {
    return createCollection(this, collName)
  }

  public runTransaction(callback: RunTranParam1, times?: number) {
    return runTransaction(this, callback, times)
  }

  public startTransaction() {
    return startTransaction(this)
  }

}

export { Db }