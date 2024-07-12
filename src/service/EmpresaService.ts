import type { PagedModel } from '@/model/PagedModel'
import type { InjectionKey } from 'vue'

export interface EmpresaService {
  obterTodos(page: number, condicoes: any): Promise<PagedModel>
  obterCodigo(codigo: number): Promise<any>
  salvar(data: any): Promise<any>
  remover(codigo: number): Promise<any>
}
export const EmpresaServiceKey = Symbol() as InjectionKey<EmpresaService>
