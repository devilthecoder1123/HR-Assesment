import { Inter } from "next/font/google";
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const googleLogin = async () => {
    await signIn('google',
      {
        callbackUrl: '/page2',
        redirect: true
      })
  }
  if (session.data === null) {
    router.push('/page2');
  }
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

