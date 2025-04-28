import { NextResponse } from 'next/server';
import { Connect } from '@/Utils/Connect';
import Task from '@/models/Task';
import { auth } from '@/auth';
import type { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params; // ✅ Await params properly

  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await Connect();
  await Task.findByIdAndDelete(taskId);

  return NextResponse.json({ message: 'Task deleted successfully' });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params; // ✅ Await params properly

  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, status } = body;

  await Connect();

  const updateData: any = {
    title,
    description,
    status,
  };

  if (status === 'Completed') {
    updateData.completedAt = new Date();
  } else {
    updateData.completedAt = null;
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    updateData,
    { new: true }
  );

  return NextResponse.json({ task });
}