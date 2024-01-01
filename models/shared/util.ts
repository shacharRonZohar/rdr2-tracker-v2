/**
 * Represents a deep object where each property is either a nested deep object or a generic object.
 */
export type DeepObject = {
  [key: string]: DeepObject | object
}

/**
 * Represents a mutable type derived from a given type `T`.
 * This type recursively removes readonly modifiers from all properties of `T`.
 * If a property of `T` is an object, this transformation is applied recursively to its properties.
 * @template T - The type to be transformed into a mutable type.
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P]
}

/**
 * Represents a type that converts each property of an object type `T` into an optional property.
 * If a property of `T` is an object, this transformation is applied recursively to its properties.
 *
 * @template T - The type to be transformed into an optional type.
 */
export type Optional<T> = {
  [P in keyof T]?: T[P] extends object ? Optional<T[P]> : T[P]
}

/**
 * Converts literal types (boolean, number, string) to their corresponding raw types.
 * For other types, it leaves them as is.
 * @template T - The type to be converted to a raw type.
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
 * @template T - The type to be converted to a raw object type.
 */
export type LiteralObjectToRaw<T> = Mutable<{
  [P in keyof T]: T[P] extends object
    ? LiteralObjectToRaw<T[P]>
    : LiteralToRaw<T[P]>
}>

/**
 * Flattens an object type `T` by extracting the union of types of its properties.
 * @template T - The type to be flattened.
 */
export type FlattenObject<T> = T extends object ? T[keyof T] : T

/**
 * Recursively flattens a deep object type `T`.
 * It extracts the union of types of its properties at all depth levels.
 * @template T - The type to be recursively flattened.
 */
export type FlattenDeepObject<T> = T extends object
  ? FlattenObject<T> extends infer O
    ? O extends DeepObject
      ? FlattenDeepObject<O>
      : O
    : never
  : T
