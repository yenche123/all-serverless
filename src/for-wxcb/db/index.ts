import { WXCB_DDD, LAF_DB, TCB_DDD } from "../../type/external";
import { Cloud } from "../cloud";
import { SdkType } from "../../type"
import { Collection } from "./collection";
class Db {

  public target: SdkType

  public lafDb?: LAF_DB
  public tcbDb?: TCB_DDD.Db
  public wxcbDb?: WXCB_DDD.Database

  constructor(cloud: Cloud, opt?: WXCB_DDD.IDatabaseConfig) {
    let t = cloud.target
    this.target = t

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

  

}

export { Db }