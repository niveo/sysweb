import type { RedeClienteService } from '../RedeClienteService'
import { BaseServiceImpl } from './BaseServiceImpl'
export class RedeClienteServiceImpl extends BaseServiceImpl implements RedeClienteService {
  constructor() {
    super('/redesclientes')
  }
}
