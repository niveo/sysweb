export interface CepService {
  pesquisar(cep: String): Promise<any>
}
