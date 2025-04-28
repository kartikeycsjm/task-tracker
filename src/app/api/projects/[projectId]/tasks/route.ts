import { NextResponse } from 'next/server';
import { Connect } from '@/Utils/Connect';
import Task from '@/models/Task';
import { auth } from '@/auth';

export async function POST(req: Request, { params }: { params: { projectId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { projectId } = params;
  const { title, description } = await req.json();

  await Connect();

  const task = await Task.create({
    title,
    description,
    projectId,
    status: 'Pending',
    createdAt: new Date(),
  });

  return NextResponse.json({ task }, { status: 201 });
}

export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { projectId } = params;
  await Connect();

  const tasks = await Task.find({ projectId });
  return NextResponse.json({ tasks });
}
