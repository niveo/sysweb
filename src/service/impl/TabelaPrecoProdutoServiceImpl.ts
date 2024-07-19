import api from '@/api'
import type { TabelaPrecoProdutoService } from '../TabelaPrecoProdutoService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class TabelaPrecoProdutoServiceImpl
  extends BaseServiceImpl
  implements TabelaPrecoProdutoService
{
  constructor() {
    super('/tabelaprecoprodutos')
  }

  obterRegistros(codigoLancamento: number): Promise<any[]> {
    return api.get('/tabelaprecoprodutos/' + codigoLancamento).then((response) => response.data)
  }
}
