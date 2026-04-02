import { apiFetch } from '@/lib/api';

export interface Ocorrencia {
  id: number;
  entregaId: number;
  motoristaId: number | null;
  tipo: 'cliente_ausente' | 'endereco_nao_encontrado' | 'recusa' | 'avaria' | 'outro';
  descricao: string;
  criadoEm: string;
  entrega?: { id: number; codigoPedido: string };
  motorista?: { id: number; nome: string } | null;
}

export type CreateOcorrenciaDto = {
  entregaId: number;
  motoristaId?: number;
  tipo: Ocorrencia['tipo'];
  descricao?: string;
};

export const occurrencesService = {
  getAll(): Promise<Ocorrencia[]> {
    return apiFetch<Ocorrencia[]>('/occurrences');
  },

  getById(id: number): Promise<Ocorrencia> {
    return apiFetch<Ocorrencia>(`/occurrences/${id}`);
  },

  create(data: CreateOcorrenciaDto): Promise<Ocorrencia> {
    return apiFetch<Ocorrencia>('/occurrences', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete(id: number): Promise<void> {
    return apiFetch<void>(`/occurrences/${id}`, { method: 'DELETE' });
  },
};
