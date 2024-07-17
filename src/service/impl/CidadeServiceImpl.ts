import type { CidadeService } from '../CidadeService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class CidadeServiceImpl extends BaseServiceImpl implements CidadeService {
  constructor() {
    super('/cidades')
  }
}
