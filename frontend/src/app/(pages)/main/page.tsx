'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '@/app/css/main.css';

import { Chat } from '@/app/components/main/chat/chat';
import '@/app/css/chat.css';

import { LeftSidebar } from '@/app/components/main/leftsidebar/leftsidebar';
import '@/app/css/leftsidebar.css';

import { RightSidebar } from '@/app/components/main/rightsidebar/rightsidebar';
import '@/app/css/rightsidebar.css';

import { Loading } from '@/app/components/utilities/loading';

import { useAuth } from '@/app/components/utilities/auth';

import { getUserInfo } from '@/app/components/utilities/api/selfGet';

export default function Main() {

  const router = useRouter();
  // const pathname = usePathname();
  const { user, room, loading } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, [router]);

  useEffect(() => {
    if (!loading && hydrated) {
      if (user) {
        console.log("User has entered the matrix");
      } else {
        console.log("Caught unverified user like Odell back in 2014");
        router.push('/login');
      }
    }

    async function loadLastTheme() {
      try {
        const res = await getUserInfo(`customLast`);
        const theme = res?.[`customLast`] as Theme;
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value)
        });
      } catch {
        console.log("Must be first time, no customs!");
      }
    }

    loadLastTheme();

  }, [user, loading, router, hydrated]);

  return (
    <div>
      {!loading && user && room &&
          <div className="Murmur">
            <LeftSidebar user={user} open={leftOpen}></LeftSidebar>
            <Chat user={user} room={room} setLeftOpen={setLeftOpen} setRightOpen={setRightOpen}></Chat>
            <RightSidebar user={user} room={room} open={rightOpen} ></RightSidebar>
          </div>
      }
      {loading && <Loading></Loading>}
    </div>
  );
}


const SELECTION = [
  "text", "border", "side", "button", "hover",
  "header", "chat", "time", "foot", "input", "send"
] as const;

type ThemeKey = typeof SELECTION[number];
type Theme = Record<ThemeKey, string>;
