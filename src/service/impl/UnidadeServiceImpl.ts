import type { UnidadeService } from '../UnidadeService'

import { BaseServiceImpl } from './BaseServiceImpl'
export class UnidadeServiceImpl extends BaseServiceImpl implements UnidadeService {
  constructor() {
    super('/unidades')
  }
}
