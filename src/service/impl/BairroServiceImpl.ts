import type { BairroService } from '../BairroService'
import api from '@/api'
export class BairroServiceImpl implements BairroService {
  pesquisarDescricao(descricao: string): Promise<any[]> {
    return api
      .get('/bairros/pesquisarDescricao', { params: { descricao: descricao } })
      .then((response) => response.data)
  }

  salvar(descricao: string): Promise<any> {
    return api.post('/bairros', { descricao }).then((response) => response.data)
  }
}
