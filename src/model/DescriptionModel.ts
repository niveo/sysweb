export class DescriptionModel {
  title?: (item: any) => any | string | null
  descriptions?: {
    span?: number
    label?: string
    data?: (item: any) => any
  }[]
}
