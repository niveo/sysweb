import type { Ref } from 'vue'
export interface UsuarioService {
  isAuthenticated(): Boolean
  $usuarioAutenticado: Ref<boolean>
  login(email: string, senha: string): Promise<void>
  empresas(): Promise<{ codigo: number; documento: string; nome: string }[]>
}
