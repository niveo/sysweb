import type { BaseService } from './BaseService'

export interface ClienteContatoService extends BaseService {
  obterRegistros(codigoCliente: number): Promise<any[]>
}
