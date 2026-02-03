"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { LogIn } from '@/app/components/login/signin'
import { CreateUser } from '@/app/components/login/createuser'
import { useAuth } from '@/app/components/utilities/auth'
import { Loading } from '@/app/components/utilities/loading'

import '@/app/css/signin.css'

export default function Login() {
  const [create, setCreate] = useState(false)
  const [useless, setUseless] = useState('');

  const router = useRouter();
  // const pathname = usePathname()
  const { user, loading } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    //if(pathname !== '/login'){
    // router.replace('/login');
    //}
  }, [router]);


  // if user is signed in it will go to main chat 
  useEffect(() => {
    if (!loading && hydrated) {
      if (user) {
        console.log("Good Luck in the Matrix!");
        setUseless('');
        router.push('/main');
      } else {
        console.log("The ethereal matrix gazes from afar...");
        setUseless('someone');
      }
    }
  }, [user, loading, router, hydrated])

  return (
    <div>
      {useless &&
        <div>
          {!create ? <LogIn setCreate={setCreate}></LogIn> : <CreateUser setCreate={setCreate}></CreateUser>}
        </div>
      }
      {!useless && <Loading></Loading>}
    </div>
  );
}


