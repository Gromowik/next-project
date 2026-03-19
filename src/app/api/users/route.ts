import { NextResponse } from 'next/server';
import type { User } from '@/modules/users/model/types';

// Моковые данные для примера
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    role: 'admin',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    role: 'user',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Алексей Сидоров',
    email: 'alex@example.com',
    role: 'user',
    createdAt: new Date('2024-03-01'),
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const role = searchParams.get('role');

  let filteredUsers = [...mockUsers];

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role);
  }

  return NextResponse.json(filteredUsers);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newUser: User = {
    id: String(mockUsers.length + 1),
    name: body.name,
    email: body.email,
    role: body.role || 'user',
    createdAt: new Date(),
  };

  mockUsers.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
