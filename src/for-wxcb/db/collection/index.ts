import { Db } from "../index"
import { SdkType } from "../../../type"
import { LAF_COL, TCB_COL, WXCB_COL, WXCB_DDD } from "../../../type/external"
import { DocumentRef } from "./document"
import { Aggregate } from "./aggregate"
import { Query } from "./query"

class Collection extends Query {

  constructor(db: Db, colName: string) {
    super(db, colName)
  }

  public doc(docId: string | number) {
    return new DocumentRef(this, docId)
  }

  public add(param: WXCB_DDD.IAddDocumentOptions) {
    let doc = new DocumentRef(this)
    return doc.create(param)
  }

  public aggregate() {
    return new Aggregate(this)
  }

}

export { Collection }