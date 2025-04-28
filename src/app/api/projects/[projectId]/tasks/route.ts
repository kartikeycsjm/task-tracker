import { NextRequest, NextResponse } from 'next/server';
import { Connect } from '@/Utils/Connect';
import Task from '@/models/Task';
import { auth } from '@/auth';

// 🛠 Corrected: context is NOT a Promise. params IS a Promise
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params; // ✅ Await params properly

  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params; // ✅ Await params properly

  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await Connect();

  const tasks = await Task.find({ projectId });
  return NextResponse.json({ tasks });
}
