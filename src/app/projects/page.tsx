import React from 'react'
import { auth } from '@/auth'
import ProjectsPage from './Project';
import { redirect } from 'next/navigation';
const page = async () => {
    let session = await auth();
    if (!session) {
        redirect('/')
    }
    return (
        <ProjectsPage />
    )
}

export default page