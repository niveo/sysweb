import type { BaseService } from './BaseService'

export interface TabelaPrecoLancamentoService extends BaseService {
  obterRegistros(codigoTabela: number): Promise<any[]>
}
