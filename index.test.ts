import { mergeRanges } from "./index";
import {
  canConvertToInteger, InvalidArrayError,
  parse,
  ParseError,
  RangeError,
  UnexpectedArgumentError,
  validateAndParseInt
} from "./utils";

test('"canConvertToInteger" function test', () => {
  expect(canConvertToInteger('0')).toBe(true)
  expect(canConvertToInteger('1')).toBe(true)
  expect(canConvertToInteger('-38')).toBe(true)
  expect(canConvertToInteger('2.')).toBe(false)
  expect(canConvertToInteger('2.3')).toBe(false)
  expect(canConvertToInteger('0.01')).toBe(false)
  expect(canConvertToInteger('sdfdsf')).toBe(false)
  expect(canConvertToInteger('1.sdsd')).toBe(false)
  expect(canConvertToInteger('-1.sdsd')).toBe(false)
  expect(canConvertToInteger('-0.234')).toBe(false)
  expect(canConvertToInteger('-')).toBe(false)
})

test('"validateAndParseInt" function test', () => {
  expect(validateAndParseInt('0')).toBe(0)
  expect(validateAndParseInt('1')).toBe(1)
  expect(validateAndParseInt('-38')).toBe(-38)
  try {
    validateAndParseInt('2.')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('2.3')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('0.01')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('sdfdsf')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('1.sdsd')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('-1.sdsd')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('-0.234')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    validateAndParseInt('-')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
})

test('"parse" function test', () => {
  expect(parse('1-3')).toEqual([1, 3])
  expect(parse('0-10')).toEqual([0, 10])
  expect(parse('-10-10')).toEqual([-10, 10])
  expect(parse('-27-0')).toEqual([-27, 0])
  expect(parse('-27-100')).toEqual([-27, 100])
  expect(parse('-100--50')).toEqual([-100, -50])
  try {
    parse('15-10')
  } catch (e) {
    expect(e).toBeInstanceOf(RangeError)
  }
  try {
    parse('500')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    parse('-1')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    parse('')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    parse('1-3-5')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    parse('some words')
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
})

test('"mergeRanges" function test', () => {
  expect(mergeRanges(['1-3', '5-7', '2-4', '8-12', '5-11'])).toEqual(['1-4', '5-12'])
  expect(mergeRanges(['5-7', '2-4', '8-12', '1-3', '5-11'])).toEqual(['1-4', '5-12'])
  expect(mergeRanges(['8-12', '5-7', '2-4', '1-3', '5-11'])).toEqual(['1-4', '5-12'])
  expect(mergeRanges(['8-12', '5-7', '5-11', '2-4', '1-3'])).toEqual(['1-4', '5-12'])

  expect(mergeRanges(['-65-5', '38-40', '1-100'])).toEqual(['-65-100'])
  expect(mergeRanges(['-65-5', '1-100', '38-40'])).toEqual(['-65-100'])

  expect(mergeRanges(['-65-5', '38-40', '1-100', '105-490'])).toEqual(['-65-100', '105-490'])

  try {
    mergeRanges([])
  } catch (e) {
    expect(e).toBeInstanceOf(InvalidArrayError)
  }
  try {
    mergeRanges([234234] as any)
  } catch (e) {
    expect(e).toBeInstanceOf(InvalidArrayError)
  }
  try {
    mergeRanges([NaN as any])
  } catch (e) {
    expect(e).toBeInstanceOf(InvalidArrayError)
  }
  try {
    mergeRanges(['sdfsdf-dsfsdf', 'df'])
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    mergeRanges(234234 as any)
  } catch (e) {
    expect(e).toBeInstanceOf(UnexpectedArgumentError)
  }
  try {
    mergeRanges('sdfsdf' as any)
  } catch (e) {
    expect(e).toBeInstanceOf(UnexpectedArgumentError)
  }
  try {
    mergeRanges(['sdfsdf'])
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    mergeRanges(['sdfsdf-43534llj'])
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    mergeRanges(['1-3.345', '5-7', '2-4', '8-12', '5-11'])
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    mergeRanges(['1-dsfsdf', '5-7', '2-4', '8-12', '5-11'])
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    mergeRanges(['1-3.345', '5-7', '2-4', '8-12', '5-11'])
  } catch (e) {
    expect(e).toBeInstanceOf(ParseError)
  }
  try {
    mergeRanges(['1--3', '5-7', '2-4', '8-12', '5-11'])
  } catch (e) {
    expect(e).toBeInstanceOf(RangeError)
  }
  try {
    mergeRanges(['-1--100'])
  } catch (e) {
    expect(e).toBeInstanceOf(RangeError)
  }
  try {
    mergeRanges(['-65-5', '38-40', '1-100', '105-100'])
  } catch (e) {
    expect(e).toBeInstanceOf(RangeError)
  }
})
