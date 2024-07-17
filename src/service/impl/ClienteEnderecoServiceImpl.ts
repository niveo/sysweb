import api from '@/api'
import type { ClienteEnderecoService } from '../ClienteEnderecoService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class ClienteEnderecoServiceImpl extends BaseServiceImpl implements ClienteEnderecoService {
  constructor() {
    super('/clienteenderecos')
  }

  obterRegistros(codigoCliente: number): Promise<any[]> {
    return api.get('/clienteenderecos/' + codigoCliente).then((response) => response.data)
  }
}
