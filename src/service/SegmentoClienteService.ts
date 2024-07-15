import type { PagedModel } from '@/model/PagedModel'

export interface SegmentoClienteService {
  obterTodos(page: number, condicoes?: any): Promise<PagedModel>
  obterCodigo(codigo: number): Promise<any>
  salvar(data: any): Promise<any>
  remover(codigo: number): Promise<any>
}
