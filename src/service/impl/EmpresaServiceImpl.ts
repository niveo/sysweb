import type { PagedModel } from '@/model/PagedModel'
import type { EmpresaService } from '../EmpresaService'
import api from '@/api'
export class EmpresaServiceImpl implements EmpresaService {
  obterTodos(condicoes: any): Promise<PagedModel> {
    return api
      .get('/empresas', {
        params: {
          page: 0,
          condicoes: JSON.stringify(condicoes)
        }
      })
      .then((response) => response.data)
  }

  obterCodigo(codigo: number): Promise<any> {
    return api.get(`/empresas/${codigo}`).then((response) => response.data)
  }
}
