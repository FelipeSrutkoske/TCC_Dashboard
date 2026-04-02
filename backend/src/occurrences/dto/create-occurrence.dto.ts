export class CreateOccurrenceDto {
  entregaId: number;
  motoristaId?: number;
  tipo: 'cliente_ausente' | 'endereco_nao_encontrado' | 'recusa' | 'avaria' | 'outro';
  descricao?: string;
}
