import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
const Homepage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-5xl font-bold mb-6">Task Tracker</h1>
      <p className="text-xl mb-8 text-center max-w-xl">
        Manage your projects and tasks efficiently. Track your progress, stay organized,
        and boost your productivity.
      </p>

      {!session ? (
        <div className="flex gap-4">
          <Link href={'/register'}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
          <Link href={'/login'}
            className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      ) : (
        <>

          <Link href={'/projects'}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            Go to Projects
          </Link>
          <form action={async () => {
            'use server'
            await signOut();
          }
          }>
            <button className="m-3 underline text-blue-600"
            type="submit">Log out</button>
          </form>
        </>
      )}
    </div>
  );
}


export default Homepage;