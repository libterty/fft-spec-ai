/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type TOptional<T> = {
  [K in keyof T]?: T[K]
}

type OmitKey<T> = {
  [K in keyof T]: T[K] extends string ? never : K
}[keyof T]

export type TOverWriteDefine<T, K> = Omit<T, OmitKey<T>> & K

// any type
export type auto = any
// bool type
export type bool = boolean
// number type
export type uint8_t = number
export type uint16_t = number
export type uint32_t = number
export type uint64_t = number
export type int8_t = number
export type int16_t = number
export type int32_t = number
export type int64_t = number
export type double = number
export type integer = number
// string type
export type wchar_t = string
export type char = string
