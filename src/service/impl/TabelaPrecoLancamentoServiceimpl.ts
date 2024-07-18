import api from '@/api'
import type { TabelaPrecoLancamentoService } from '../TabelaPrecoLancamentoService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class TabelaPrecoLancamentoServiceimpl
  extends BaseServiceImpl
  implements TabelaPrecoLancamentoService
{
  constructor() {
    super('/tabelaprecolancamentos')
  }

  obterRegistros(codigoTabela: number): Promise<any[]> {
    return api.get('/tabelaprecolancamentos/' + codigoTabela).then((response) => response.data)
  }
}
