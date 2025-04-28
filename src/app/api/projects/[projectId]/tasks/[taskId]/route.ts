import { NextResponse } from 'next/server';
import { Connect } from '@/Utils/Connect';
import Task from '@/models/Task';
import { auth } from '@/auth';

export async function DELETE(req: Request, { params }: { params: { projectId: string; taskId: string } }) {

    const session = await auth();

    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId } = params;

    await Connect();

    await Task.findByIdAndDelete(taskId);

    return NextResponse.json({ message: 'Task deleted successfully' });
    

}


export async function PUT(req: Request, { params }: { params: { projectId: string; taskId: string } }) {
    const session = await auth();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { taskId } = params;
    const { title, description, status } = await req.json();

    await Connect();

    const task = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });

    return NextResponse.json({ task });
}