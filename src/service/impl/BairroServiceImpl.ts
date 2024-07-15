import type { PagedModel } from '@/model/PagedModel'
import type { BairroService } from '../BairroService'
import api from '@/api'
export class BairroServiceImpl implements BairroService {
  obterTodos(page: number = 1, condicoes: any): Promise<PagedModel> {
    return api
      .get('/bairros', {
        params: {
          page: page,
          condicoes: JSON.stringify(condicoes)
        }
      })
      .then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post('/bairros', data).then((response) => response.data)
  }
}
