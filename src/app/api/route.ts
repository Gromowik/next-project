import { NextResponse } from 'next/server';

// Пример GET запроса
export async function GET() {
  return NextResponse.json({
    message: 'API работает!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: '/api/users',
      auth: '/api/auth',
      dashboard: '/api/dashboard',
    },
  });
}
