import type { ProdutoService } from '../ProdutoService'

import { BaseServiceImpl } from './BaseServiceImpl'

export class ProdutoServiceImpl extends BaseServiceImpl implements ProdutoService {
  constructor() {
    super('/produtos')
  }
}
