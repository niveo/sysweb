export interface ClienteEnderecoService {
  obterRegistros(codigoCliente: number): Promise<any[]>
  salvar(data: any): Promise<any>
  remover(codigo: number): Promise<any>
}
