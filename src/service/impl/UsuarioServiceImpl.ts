import api from '@/api'
import type { UsuarioService } from '../UsuarioService'
import { useJwt } from '@vueuse/integrations/useJwt'
import dayjs from 'dayjs'
import { ref } from 'vue'

export class UsuarioServiceImpl implements UsuarioService {
  tempoSessaoToken?: Date
  $usuarioAutenticado = ref<boolean>(false)

  async login(email: string, senha: string): Promise<void> {
    const response = await api.post('/usuarios/login', {
      email: email,
      senha: senha
    })

    const decoded = useJwt(response.data.token)
    this.tempoSessaoToken = new Date(decoded.payload!!.value!!.exp!! * 1000)
    sessionStorage.setItem('TOKEN', response.data.token)
    this.$usuarioAutenticado.value = true
  }

  isAuthenticated = (): boolean => {
    if (!this.$usuarioAutenticado.value) return false
    return !this.isSessaoExpirou()
  }

  private isSessaoExpirou = () =>
    this.tempoSessaoToken ? dayjs(this.tempoSessaoToken!!).isBefore(new Date()) : false

  async empresas(): Promise<{ codigo: number; documento: string; nome: string }[]> {
    const response = await api.get('/usuarios/empresas')
    return response.data
  }
}
