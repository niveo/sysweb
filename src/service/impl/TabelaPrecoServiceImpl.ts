import type { TabelaPrecoService } from '../TabelaPrecoService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class TabelaPrecoServiceImpl extends BaseServiceImpl implements TabelaPrecoService {
  constructor() {
    super('/tabelaprecos')
  }
}
