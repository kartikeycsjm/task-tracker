import React from 'react'
import { auth } from '@/auth'
import RegisterPage from './Register';
import { redirect } from 'next/navigation';
const page = async () => {
    let session = await auth();
    if (session) {
        redirect('/')
    }
    return (
        <RegisterPage />
    )
}

export default page