// import NextAuth from "next-auth"
// import CredentialsProvider from 'next-auth/providers/credentials';
// we will create this next
// import { compare } from 'bcryptjs'; // for password checking

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials) {
//                 await Connect();
//                 const user = await User.findOne({ email: credentials?.email });
//                 if (!user) throw new Error('No user found');

//                 const isPasswordCorrect = await compare(credentials!.password, user.password);
//                 if (!isPasswordCorrect) throw new Error('Wrong password');

//                 return user;
//             },
//         }),
//     ],
// })




import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { Connect } from '@/Utils/Connect';
import User from '@/models/User';
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers:
        [
            Credentials({
                credentials: {
                    email: {},
                    password: {},
                },
                authorize: async (credentials) => {
                    const email = credentials.email as string
                    const password = credentials.password as string

                    await Connect();

                    const user = await User.findOne({ email })

                    if (!user) {
                        throw new CredentialsSignin('You are not registered')
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    if (user && !isMatch) {
                        throw new CredentialsSignin('Please write correct password')
                    }
                    return {
                        id: user._id.toString(), // important! save user id!
                        email: user.email,
                        name: user.name,
                        country: user.country,
                    };
                }
            })
        ],
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
},
    pages: {
    signIn: '/login',
    error: '/error',
}
})



