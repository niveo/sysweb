import type { InjectionKey } from 'vue'

export interface EstadoService {
  obterTodos(): Promise<any[]>
}
export const EstadoServiceKey = Symbol() as InjectionKey<EstadoService>
