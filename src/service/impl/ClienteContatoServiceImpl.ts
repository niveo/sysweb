import api from '@/api'
import type { ClienteContatoService } from '../ClienteContatoService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class ClienteContatoServiceImpl extends BaseServiceImpl implements ClienteContatoService {
  constructor() {
    super('/clientecontatos')
  }

  obterRegistros(codigoCliente: number): Promise<any[]> {
    return api.get('/clientecontatos/' + codigoCliente).then((response) => response.data)
  }
}
