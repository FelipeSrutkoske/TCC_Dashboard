import { apiFetch } from '@/lib/api';

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: 'ADMIN' | 'DASHBOARD' | 'MOTORISTA';
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const data = await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('trackit_token', data.access_token);
      localStorage.setItem('trackit_user', JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('trackit_token');
      localStorage.removeItem('trackit_user');
    }
  },

  getUser(): LoginResponse['user'] | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('trackit_user');
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('trackit_token');
  },
};
