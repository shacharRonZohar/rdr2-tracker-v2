export function isKeyOf<T extends object>(obj: T, key: any): key is keyof T {
  return key in obj
}
