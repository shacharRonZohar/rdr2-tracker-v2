export function isKeyOf<T extends object>(obj: T, key: any): key is keyof T {
  return key in obj
}

export function hasAtLeastOneKey<T>(obj: any): obj is T {
  return Object.keys(obj).length > 0
}

export function isNull(item: unknown): item is null {
  return item === null
}
