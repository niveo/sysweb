import type { BaseService } from './BaseService'

export interface TabelaPrecoProdutoService extends BaseService {
  obterRegistros(codigoLancamento: number): Promise<any[]>
}
