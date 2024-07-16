import type { PagedModel } from '@/model/PagedModel'
import type { TabelaPrecoService } from '../TabelaPrecoService'
import api from '@/api'
const path = '/tabelaprecos'
export class TabelaPrecoServiceImpl implements TabelaPrecoService {
  obterTodos(page: number = 1, condicoes: any): Promise<PagedModel> {
    return api
      .get(path, {
        params: {
          page: page,
          condicoes: condicoes ? JSON.stringify(condicoes) : null
        }
      })
      .then((response) => response.data)
  }

  obterCodigo(codigo: number): Promise<any> {
    return api.get(`${path}/${codigo}`).then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post(path, data).then((response) => response.data)
  }

  remover(codigo: number): Promise<any> {
    return api.delete(`${path}/${codigo}`).then((response) => response.data)
  }
}
