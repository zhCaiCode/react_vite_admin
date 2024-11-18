export type AllowedValueTypes = string | number | boolean | null | undefined
export type NestedObject = {
  [key: string]: AllowedValueTypes | NestedObject
}
