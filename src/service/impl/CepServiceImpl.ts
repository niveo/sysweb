import type { CepService } from '../CepService'
import api from '@/api'
export class CepServiceImpl implements CepService {
  pesquisar(cep: String): Promise<any> {
    return api.get('/cep/' + cep).then((response) => response.data)
  }
}
