import { NextResponse } from 'next/server';
import { Connect } from '@/Utils/Connect';
import Task from '@/models/Task';
import { auth } from '@/auth';

export async function DELETE(request: Request, context: { params: { projectId: string; taskId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { taskId } = context.params;
  await Connect();

  await Task.findByIdAndDelete(taskId);

  return NextResponse.json({ message: 'Task deleted successfully' });
}

export async function PUT(request: Request, context: { params: { projectId: string; taskId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { taskId } = context.params;
  const { title, description, status } = await request.json();

  await Connect();

  const task = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });

  return NextResponse.json({ task });
}
