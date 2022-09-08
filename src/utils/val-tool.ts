

const waitMilli = (milli: number = 0): Promise<true> => {
  let _t = (a: (a1: true) => void) => {
    setTimeout(() => {
      a(true)
    }, milli)
  }

  return new Promise(_t)
}

const copyObject = <T = any>(obj: T): T => {
  let type = typeof obj
  if(type !== "object") return obj

  let obj2: T;
  try {
    obj2 = JSON.parse(JSON.stringify(obj))
  }
  catch(err) {
    return obj
  }
  return obj2
}

// 快速把入参 val 包裹在 Promise 里返回
const getPromise = <T = any>(val: T): Promise<T> => {
  return new Promise(a => a(val)) 
}

export default {
  waitMilli,
  copyObject,
  getPromise,
}