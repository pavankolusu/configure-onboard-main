import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.userData.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email } = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }
  const user = await prisma.userData.create({ data: { name, email } });
  return NextResponse.json(user);
}
