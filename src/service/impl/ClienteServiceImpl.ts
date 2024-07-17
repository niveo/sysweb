import type { ClienteService } from '../ClienteService'

import { BaseServiceImpl } from './BaseServiceImpl'
export class ClienteServiceImpl extends BaseServiceImpl implements ClienteService {
  constructor() {
    super('/clientes')
  }
}
