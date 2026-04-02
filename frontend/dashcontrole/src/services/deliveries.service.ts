import { apiFetch } from '@/lib/api';

export type StatusEntrega = 'AGUARDANDO_MOTORISTA' | 'EM_ROTA' | 'ENTREGUE' | 'CANCELADO';

export interface Entrega {
  id: number;
  driverId: number | null;
  destinationAddress: string;
  deliveryEstimate: string | null;
  status: StatusEntrega;
  driver?: {
    id: number;
    userId: number;
    user: { id: number; nome: string };
    placaVeiculo?: string;
  } | null;
  occurrences?: any[];
  finalization?: any;
}

export interface DeliveryStats {
  total: number;
  entregues: number;
  pendentes: number;
  emRota: number;
  cancelados: number;
}

export const deliveriesService = {
  getAll(): Promise<Entrega[]> {
    return apiFetch<Entrega[]>('/deliveries');
  },

  getById(id: number): Promise<Entrega> {
    return apiFetch<Entrega>(`/deliveries/${id}`);
  },

  getStats(): Promise<DeliveryStats> {
    return apiFetch<DeliveryStats>('/deliveries/stats');
  },

  update(id: number, data: Partial<Entrega> & { motoristaId?: number }): Promise<Entrega> {
    return apiFetch<Entrega>(`/deliveries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete(id: number): Promise<void> {
    return apiFetch<void>(`/deliveries/${id}`, { method: 'DELETE' });
  },
};
