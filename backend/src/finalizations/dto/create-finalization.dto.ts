export class CreateFinalizationDto {
  entregaId: number;
  confirmacaoTipo: 'assinatura' | 'foto' | 'codigo' | 'sem_confirmacao';
  assinatura?: string;
  foto?: string;
}
