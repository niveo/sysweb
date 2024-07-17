import type { SegmentoClienteService } from '../SegmentoClienteService'

import { BaseServiceImpl } from './BaseServiceImpl'
export class SegmentoClienteServiceImpl extends BaseServiceImpl implements SegmentoClienteService {
  constructor() {
    super('/segmentosclientes')
  }
}
