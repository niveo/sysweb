import type { ConfiguracaoGradeService } from '../ConfiguracaoGradeService'
import api from '@/api'
export class ConfiguracaoGradeServiceImpl implements ConfiguracaoGradeService {
  obterCodigo(codigo: number): Promise<any> {
    return api.get(`/configuracaograde/${codigo}`).then((response) => response.data)
  }
}
