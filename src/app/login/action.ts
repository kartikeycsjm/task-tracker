'use server'
import { signIn } from "@/auth";
export const LogIn = async (email: string, password: string) => {
    try {
        let response = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (response?.error) {
            throw new Error(response.error);
        }

        return { status: 'success', error: '' };
    } catch (error) {
        return { status: 'failed', error: (error as Error).message };
    }
};



