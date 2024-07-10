import type { InjectionKey } from 'vue'

export interface CepService {
  pesquisar(cep: String): Promise<any>
}
export const CepServiceKey = Symbol() as InjectionKey<CepService>
