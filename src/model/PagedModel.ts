export type PagedType = { number: number; size: number; totalElements: number; totalPages: number }
export class PagedModel {
  content?: any[]
  page?: PagedType
}
