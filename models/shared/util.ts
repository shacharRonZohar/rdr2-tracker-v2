export type DeepObject = {
  [key: string]: DeepObject | object
}

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P]
}

export type LiteralToRaw<T> = T extends boolean
  ? boolean
  : T extends number
  ? number
  : T extends string
  ? string
  : T

export type LiteralObjectToRaw<T> = Mutable<{
  [P in keyof T]: T[P] extends object
    ? LiteralObjectToRaw<T[P]>
    : LiteralToRaw<T[P]>
}>

export type FlattenObject<T> = T extends object ? T[keyof T] : T

export type FlattenDeepObject<T> = T extends object
  ? FlattenObject<T> extends infer O
    ? O extends DeepObject
      ? FlattenDeepObject<O>
      : O
    : never
  : T
