import type { BaseService } from './BaseService'

export interface ProdutoUnidadeService extends BaseService {
  obterRegistros(codigoProduto: number): Promise<any[]>
}
