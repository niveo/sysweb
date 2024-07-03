import type { InjectionKey, Ref } from 'vue'
export interface UsuarioService {
  isAuthenticated(): Boolean
  $usuarioAutenticado: Ref<boolean>
  login(email: string, senha: string): Promise<void>
}

export const UsuarioServiceKey = Symbol() as InjectionKey<UsuarioService>
