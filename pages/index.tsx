import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  console.log('session', session);


  const googleLogin = async () => {
    await signIn('google',
      {
        callbackUrl: '/page2',
        redirect: true
      })
  }
  if (session.data === null) {
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}> <button
      onClick={googleLogin}
    >
        Sign in with google
      </button>
    </div>
  }
  return (
    null
  )
}
