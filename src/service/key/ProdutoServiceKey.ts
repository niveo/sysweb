import type { InjectionKey } from 'vue'
import type { ProdutoService } from '../ProdutoService'
export const ProdutoServiceKey = Symbol() as InjectionKey<ProdutoService>
