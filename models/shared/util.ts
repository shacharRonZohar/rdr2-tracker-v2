/**
 * Represents a deep object where each property is either a nested deep object or a generic object.
 */
export type DeepObject = {
  [key: string]: DeepObject | object
}

/**
 * Represents a mutable type derived from a given type `T`.
 * This type recursively removes readonly modifiers from all properties of `T`.
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P]
}

/**
 * Converts literal types (boolean, number, string) to their corresponding raw types.
 * For other types, it leaves them as is.
 */
export type LiteralToRaw<T> = T extends boolean
  ? boolean
  : T extends number
  ? number
  : T extends string
  ? string
  : T

/**
 * Converts a literal object type to a raw object type. It applies `LiteralToRaw` to each property of the object,
 * and makes the object mutable using `Mutable`.
 */
export type LiteralObjectToRaw<T> = Mutable<{
  [P in keyof T]: T[P] extends object
    ? LiteralObjectToRaw<T[P]>
    : LiteralToRaw<T[P]>
}>

/**
 * Flattens an object type `T` by extracting the union of types of its properties.
 */
export type FlattenObject<T> = T extends object ? T[keyof T] : T

/**
 * Recursively flattens a deep object type `T`.
 * It extracts the union of types of its properties at all depth levels.
 */
export type FlattenDeepObject<T> = T extends object
  ? FlattenObject<T> extends infer O
    ? O extends DeepObject
      ? FlattenDeepObject<O>
      : O
    : never
  : T
