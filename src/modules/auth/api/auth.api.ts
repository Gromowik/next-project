import type { AuthResponse, LoginCredentials, SignupData } from '../model/types';

/**
 * API для аутентификации
 */
async function readJsonOrThrow<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message?: unknown }).message ?? 'Request failed')
        : 'Request failed';
    throw new Error(message);
  }

  return payload as T;
}

export const authApi = {
  /**
   * Вход в систему
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return readJsonOrThrow<AuthResponse>(response);
  },

  /**
   * Регистрация
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return readJsonOrThrow<AuthResponse>(response);
  },

  /**
   * Выход из системы
   */
  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  async me(): Promise<{ user: Omit<AuthResponse['user'], 'token'> | null }> {
    const response = await fetch('/api/auth/me');
    if (response.status === 401) {
      return { user: null };
    }
    return readJsonOrThrow<{ user: Omit<AuthResponse['user'], 'token'> | null }>(response);
  },
};
