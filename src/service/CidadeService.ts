import type { PagedModel } from '@/model/PagedModel'
import type { InjectionKey } from 'vue'

export interface CidadeService {
  pesquisarDescricao(descricao: String): Promise<any[]>
}
export const CidadeServiceKey = Symbol() as InjectionKey<CidadeService>
