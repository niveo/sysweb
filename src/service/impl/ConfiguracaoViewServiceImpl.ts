import type { ConfiguracaoViewService } from '../ConfiguracaoViewService'
import api from '@/api'
export class ConfiguracaoViewServiceImpl implements ConfiguracaoViewService {
  obterCodigo(codigo: number): Promise<any> {
    return api.get(`/configuracaoviews/${codigo}`).then((response) => response.data)
  }
}
