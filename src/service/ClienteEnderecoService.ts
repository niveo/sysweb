import type { BaseService } from './BaseService'
export interface ClienteEnderecoService extends BaseService {
  obterRegistros(codigoCliente: number): Promise<any[]>
}
