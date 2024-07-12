import api from '@/api'
import type { ClienteContatoService } from '../ClienteContatoService'
export class ClienteContatoServiceImpl implements ClienteContatoService {
  obterRegistros(codigoCliente: number): Promise<any[]> {
    return api.get('/clientecontatos/' + codigoCliente).then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post('/clientecontatos', data).then((response) => response.data)
  }

  remover(codigo: number): Promise<any> {
    return api.delete('/clientecontatos/' + codigo).then((response) => response.data)
  }
}
