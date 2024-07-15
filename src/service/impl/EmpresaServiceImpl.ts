import type { PagedModel } from '@/model/PagedModel'
import type { EmpresaService } from '../EmpresaService'
import api from '@/api'
export class EmpresaServiceImpl implements EmpresaService {
  obterTodos(page: number = 1, condicoes: any): Promise<PagedModel> {
    return api
      .get('/empresas', {
        params: {
          page: page,
          condicoes: JSON.stringify(condicoes)
        }
      })
      .then((response) => response.data)
  }

  obterCodigo(codigo: number): Promise<any> {
    return api.get(`/empresas/${codigo}`).then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post('/empresas', data).then((response) => response.data)
  }

  remover(codigo: number): Promise<any> {
    return api.delete(`/empresas/${codigo}`).then((response) => response.data)
  }
}
