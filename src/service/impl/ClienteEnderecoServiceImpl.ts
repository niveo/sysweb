import api from '@/api'
import type { ClienteEnderecoService } from '../ClienteEnderecoService'
export class ClienteEnderecoServiceImpl implements ClienteEnderecoService {
  obterRegistros(codigoCliente: number): Promise<any[]> {
    return api.get('/clienteenderecos/' + codigoCliente).then((response) => response.data)
  }

  salvar(data: any): Promise<any> {
    return api.post('/clienteenderecos', data).then((response) => response.data)
  }

  remover(codigo: number): Promise<any> {
    return api.delete('/clienteenderecos/' + codigo).then((response) => response.data)
  }
}
