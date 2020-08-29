export const InvalidArrayError: any = function (this: any, message: string) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

export const UnexpectedArgumentError: any = function (this: any, message: string) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

export const ParseError: any = function (this: any, message: string) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

export const RangeError: any = function (this: any, message: string) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

export const canConvertToInteger = (value: string) => {
  value = value.trim();
  if (!value) {
    return false;
  }
  value = value.replace(/^0+/, '') || '0';
  const n = Math.floor(Number(value));
  return n !== Infinity && String(n) === value;
}

export const validateAndParseInt = (val: string): number => {
  if (!canConvertToInteger(val)) {
    throw new ParseError(`"${val}" is not an integer`)
  }
  return parseInt(val)
}

const convertToArrayOfIntegers = (value: string[]) => {
  const result: string[] = []
  value.forEach((value, index, array) => {
    if (value === '') {
      result.push((-array[index + 1]).toString())
      array.splice(index + 1, 1)
    } else {
      result.push(value)
    }
  })
  return result
}

export const parse = (value: string) => {
  const splittedValue = value.split('-')
  const preparedToParseArray = convertToArrayOfIntegers(splittedValue)
  if (preparedToParseArray.length !== 2) {
    throw new ParseError(`Can not parse "${JSON.stringify(value)}"`)
  }
  const result = preparedToParseArray.map(val => validateAndParseInt(val))
  if (result[1] < result[0]) {
    throw new RangeError(`Incorrect range "${value}"`)
  }
  return result
}
