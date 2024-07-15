import type { PagedModel } from '@/model/PagedModel'

export interface EmpresaService {
  obterTodos(page: number, condicoes: any): Promise<PagedModel>
  obterCodigo(codigo: number): Promise<any>
  salvar(data: any): Promise<any>
  remover(codigo: number): Promise<any>
}
