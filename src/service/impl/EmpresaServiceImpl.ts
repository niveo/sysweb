import type { EmpresaService } from '../EmpresaService'

import { BaseServiceImpl } from './BaseServiceImpl'
export class EmpresaServiceImpl extends BaseServiceImpl implements EmpresaService {
  constructor() {
    super('/empresas')
  }
}
