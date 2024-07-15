import type { PagedModel } from '@/model/PagedModel'

export interface BairroService {
  salvar(data: any): Promise<any>
  obterTodos(page: number, condicoes: any): Promise<PagedModel>
}
