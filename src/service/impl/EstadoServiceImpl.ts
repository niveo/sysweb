import type { EstadoService } from '../EstadoService'
import api from '@/api'
export class EstadoServiceImpl implements EstadoService {
  obterTodos(): Promise<any[]> {
    return api.get('/estados').then((response) => response.data)
  }
}
