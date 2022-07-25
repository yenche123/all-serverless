import { Db } from "../index"
import { SdkType } from "../../../type"
import { LAF_COL, TCB_COL, WXCB_COL, WXCB_DDD } from "../../../type/external"
import { DocumentRef } from "./document"

class Collection {

  public target: SdkType

  public lafCol?: LAF_COL
  public tcbCol?: TCB_COL
  public wxcbCol?: WXCB_COL

  constructor(db: Db, colName: string) {
    let t = db.target
    this.target = t

    if(t === SdkType.LAF) {
      this.lafCol = db.lafDb?.collection(colName)
    }
    else if(t === SdkType.TCB) {
      this.tcbCol = db.tcbDb?.collection(colName)
    }
    else if(t === SdkType.WXCB) {
      this.wxcbCol = db.wxcbDb?.collection(colName)
    }
  }

  public doc(docId: string | number) {
    return new DocumentRef(this, docId)
  }

  public add(param: WXCB_DDD.IAddDocumentOptions) {
    let doc = new DocumentRef(this)
    return doc.create(param)
  }

  public aggregate() {
    
  }

}

export { Collection }