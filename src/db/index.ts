// 引入 外部sdk

import { Database as TcbDDD } from "@cloudbase/node-sdk"
import { Db as LafDb } from "laf-client-sdk"
import { DB as WxcbDDD } from "wx-server-sdk"
import { AsCloud } from "../as-cloud"
type TcbDb = TcbDDD.Db
type WxDb = WxcbDDD.Database

// 引入 内部变量
import { AsCloudCfg, SdkType } from "../types";
import { DatabaseParam } from "../types/cloud";
import { CollectionRef } from "./collection";

class Db {

  public target: SdkType

  public lafDb?: LafDb
  public wxDb?: WxDb
  public tcbDb?: TcbDb

  constructor(asCloud: AsCloud, opt?: DatabaseParam) {
    let t = asCloud.target
    this.target = t
    
    if(t === SdkType.LAF) {
      this.lafDb = asCloud.getLafApp()?.database()
    }
    else if(t === SdkType.WXCB) {
      this.wxDb = asCloud.getWxcbInstance()?.database(opt)
    }
    else if(t === SdkType.TCB) {
      this.tcbDb = asCloud.getTcbApp()?.database(opt)
    }
  }

  public collection(collName: string) {
    if (!collName) {
      throw new Error('Collection name is required')
    }
    return new CollectionRef(this, collName)
  }

}

export { Db }