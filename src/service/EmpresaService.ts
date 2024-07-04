import type { PagedModel } from '@/model/PagedModel'
import type { InjectionKey } from 'vue'

export interface EmpresaService {
  obterTodos(condicoes: any): Promise<PagedModel>
  obterCodigo(codigo: number): Promise<any>
}
export const EmpresaServiceKey = Symbol() as InjectionKey<EmpresaService>
