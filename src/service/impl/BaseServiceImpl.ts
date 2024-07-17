import type { PagedModel } from '@/model/PagedModel'
import type { BaseService } from '../BaseService'
import api from '@/api'

export class BaseServiceImpl implements BaseService {
  constructor(private readonly path: string) {}

  obterTodos(page: number = 1, condicoes: any): Promise<PagedModel> {
    return api
      .get(this.path, {
        params: {
          page: page,
          condicoes: condicoes ? JSON.stringify(condicoes) : null
        }
      })
      .then((response) => response.data)
  }

  obterCodigo(codigo: number): Promise<any> {
    return api.get(`${this.path}/${codigo}`).then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post(this.path, data).then((response) => response.data)
  }

  remover(codigo: number): Promise<any> {
    return api.delete(`${this.path}/${codigo}`).then((response) => response.data)
  }
}
