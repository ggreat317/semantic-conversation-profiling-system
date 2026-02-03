'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import "../../css/signin.css";
import "../../css/leftsidebar.css";
import "../../css/main.css";
import "../../css/rightsidebar.css";
import "../../css/chat.css";

import { Loading } from "./loading";


export function HomePage(){
  const router = useRouter();
  useEffect(() => {
    router.replace('/login')
  },[]);

  return (
    <Loading />
  );
}
