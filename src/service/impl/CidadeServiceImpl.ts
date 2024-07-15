import type { PagedModel } from '@/model/PagedModel'
import type { CidadeService } from '../CidadeService'
import api from '@/api'
export class CidadeServiceImpl implements CidadeService {
  obterTodos(page: number = 1, condicoes: any): Promise<PagedModel> {
    return api
      .get('/cidades', {
        params: {
          page: page,
          condicoes: JSON.stringify(condicoes)
        }
      })
      .then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post('/cidades', data).then((response) => response.data)
  }
}
