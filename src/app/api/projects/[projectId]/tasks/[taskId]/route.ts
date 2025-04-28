import { Connect } from '@/Utils/Connect';
import Task from '@/models/Task';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
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

  const { taskId } = context.params; // 🔥 use context.params
  const body = await request.json();
  const { title, description, status } = body;

  await Connect();
  const task = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });

  return NextResponse.json({ task });
}
