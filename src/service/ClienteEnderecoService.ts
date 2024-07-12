import type { InjectionKey } from 'vue'

export interface ClienteEnderecoService {
  obterRegistros(codigoCliente: number): Promise<any[]>
  salvar(data: any): Promise<any>
  remover(codigo: number): Promise<any>
}
export const ClienteEnderecoServiceKey = Symbol() as InjectionKey<ClienteEnderecoService>
