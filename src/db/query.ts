import { Db } from "./index";


export class Query {


  // 数据库实例
  protected _db: Db

  // 集合（表）名
  protected _collName: string


  public constructor(
    db: Db,
    collName: string,
  ) {
    this._db = db
    this._collName = collName
  }


}