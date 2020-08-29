import { parse, UnexpectedArgumentError, InvalidArrayError } from "./utils";

export const mergeRanges = (stringRanges: string[]) => {
  if (!Array.isArray(stringRanges)) {
    throw new UnexpectedArgumentError(`Unexpected argument ${JSON.stringify(stringRanges)}`)
  }

  if (stringRanges.length === 0) {
    throw new InvalidArrayError(`Array can not be empty`)
  }

  const ranges: number[][] = stringRanges.map(range => {
    if (typeof range !== 'string') {
      throw new InvalidArrayError(`The element of array must be string type. Got: ${range}`)
    }
    return parse(range)
  })

  // sort the ranges by lower boundary if they are equal then sort by upper boundary
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1])

  const result: number[][] = []
  let temp: number[] | null = null

  ranges.forEach(range => {
    if (temp === null || range[0] > temp[1]) {
      temp = range
      result.push(range)
    } else if (range[1] > temp[1]) {
      temp[1] = range[1]
    }
  })

  return result.map(value => value.join('-'))
}
