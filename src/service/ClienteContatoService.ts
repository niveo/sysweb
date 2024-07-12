import type { InjectionKey } from 'vue'

export interface ClienteContatoService {
  obterRegistros(codigoCliente: number): Promise<any[]>
  salvar(data: any): Promise<any>
  remover(codigo: number): Promise<any>
}
export const ClienteContatoServiceKey = Symbol() as InjectionKey<ClienteContatoService>