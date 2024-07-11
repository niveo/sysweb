import type { PagedModel } from '@/model/PagedModel'
import type { ClienteService } from '../ClienteService'
import api from '@/api'
export class ClienteServiceImpl implements ClienteService {
  obterTodos(page: number = 0, condicoes: any): Promise<PagedModel> {
    return api
      .get('/clientes', {
        params: {
          page: page,
          condicoes: JSON.stringify(condicoes)
        }
      })
      .then((response) => response.data)
  }

  obterCodigo(codigo: number): Promise<any> {
    return api.get(`/clientes/${codigo}`).then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post('/clientes', data).then((response) => response.data)
  }

  remover(codigo: number): Promise<any> {
    return api.delete(`/clientes/${codigo}`).then((response) => response.data)
  }
}
