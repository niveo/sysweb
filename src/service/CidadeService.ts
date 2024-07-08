import type { InjectionKey } from 'vue'

export interface CidadeService {
  salvar(descricao: String, estado: number): Promise<any>
  pesquisarDescricao(descricao: String): Promise<any[]>
}
export const CidadeServiceKey = Symbol() as InjectionKey<CidadeService>
