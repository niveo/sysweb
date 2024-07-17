import type { BairroService } from '../BairroService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class BairroServiceImpl extends BaseServiceImpl implements BairroService {
  constructor() {
    super('/bairros')
  }
}
