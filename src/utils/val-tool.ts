

const waitMilli = (milli: number = 0): Promise<true> => {
  let _t = (a: (a1: true) => void) => {
    setTimeout(() => {
      a(true)
    }, milli)
  }

  return new Promise(_t)
}

export default {
  waitMilli
}