import type { PagedModel } from '@/model/PagedModel'

export interface CidadeService {
  salvar(descricao: String, estado: number): Promise<any>
  obterTodos(page: number, condicoes: any): Promise<PagedModel>
}
