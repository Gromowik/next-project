import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Здесь будет запрос к БД
  return NextResponse.json({
    id,
    name: 'Пользователь ' + id,
    email: `user${id}@example.com`,
    role: 'user',
    createdAt: new Date(),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  return NextResponse.json({
    id,
    ...body,
    updatedAt: new Date(),
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  return NextResponse.json({
    message: `Пользователь ${id} удален`,
  });
}
