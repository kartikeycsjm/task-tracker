import { NextRequest, NextResponse } from 'next/server';
import { Connect } from '@/Utils/Connect';
import Project from '@/models/Project';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { title } = await req.json();
  await Connect();

  if (!session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const projectCount = await Project.countDocuments({ userId: session.user.id });

  if (projectCount >= 4) {
    return NextResponse.json({ message: 'You can only have up to 4 projects.' }, { status: 400 });
  }

  const project = await Project.create({
    title,
    userId: session.user.id,
  });

  return NextResponse.json({ project }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await Connect();

  if (!session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const projects = await Project.find({ userId: session.user.id });
  return NextResponse.json({ projects });
}
