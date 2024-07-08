import type { InjectionKey } from 'vue'

export interface BairroService {
  salvar(descricao: String): Promise<any>
  pesquisarDescricao(descricao: String): Promise<any[]>
}
export const BairroServiceKey = Symbol() as InjectionKey<BairroService>
