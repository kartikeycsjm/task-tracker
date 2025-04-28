import React from 'react'
import { auth } from '@/auth'
import ProjectDetails from './ProjectDetails';
import { redirect } from 'next/navigation';
const page = async () => {
    let session = await auth();
    if (!session) {
        redirect('/')
    }
    return (
        <ProjectDetails/>
    )
}

export default page