import type { CidadeService } from '../CidadeService'
import api from '@/api'
export class CidadeServiceImpl implements CidadeService {
  pesquisarDescricao(descricao: string): Promise<any[]> {
    return api
      .get('/cidades/pesquisarDescricao', { params: { descricao: descricao } })
      .then((response) => response.data)
  }
}
