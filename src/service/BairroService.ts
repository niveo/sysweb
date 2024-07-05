import type { PagedModel } from '@/model/PagedModel'
import type { InjectionKey } from 'vue'

export interface BairroService {
  pesquisarDescricao(descricao: String): Promise<any[]>
}
export const BairroServiceKey = Symbol() as InjectionKey<BairroService>
