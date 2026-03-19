import type { User, UserFilters } from '../model/types';

/**
 * API для работы с пользователями
 */
export const usersApi = {
  /**
   * Получить список пользователей
   */
  async getUsers(filters?: UserFilters): Promise<User[]> {
    // Здесь будет реальный API запрос
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.role) params.set('role', filters.role);
    
    const response = await fetch(`/api/users?${params}`);
    return response.json();
  },

  /**
   * Получить пользователя по ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },

  /**
   * Создать нового пользователя
   */
  async createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
