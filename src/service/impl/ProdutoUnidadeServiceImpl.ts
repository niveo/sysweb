import api from '@/api'
import type { ProdutoUnidadeService } from '../ProdutoUnidadeService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class ProdutoUnidadeServiceImpl extends BaseServiceImpl implements ProdutoUnidadeService {
  constructor() {
    super('/produtounidades')
  }

  obterRegistros(codigoProduto: number): Promise<any[]> {
    return api.get('/produtounidades/' + codigoProduto).then((response) => response.data)
  }
}
