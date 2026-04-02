export class CreateDeliveryDto {
  codigoPedido: string;
  cliente: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  status?: 'pendente' | 'em_rota' | 'entregue' | 'ocorrencia';
  peso?: string;
  volumes?: number;
  observacoes?: string;
  motoristaId?: number;
}
