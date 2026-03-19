export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

export interface UserFilters {
  search?: string;
  role?: User['role'];
  limit?: number;
}
