import type { ConfiguracaoPesquisaService } from '../ConfiguracaoPesquisaService'
import api from '@/api'
export class ConfiguracaoPesquisaServiceImpl implements ConfiguracaoPesquisaService {
  obterCodigo(codigo: number): Promise<any> {
    return api.get(`/configuracaopesquisa/${codigo}`).then((response) => response.data)
  }
}
