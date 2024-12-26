'use client';
import BottomMenu from "@/components/bottomMenu/BottomMenu";
import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { createClient } from "@/util/supabase/client";
import { useStore } from "zustand";
import { UserStore } from "@/store/user";
import Loading from "@/components/loading/Loading";
import dynamic from "next/dynamic";
const FeedList = dynamic(() => import("@/components/feed/FeedList"), {
  ssr: false,
});

export default function Home() {
  const supabase = createClient();
  const setUserEmail = UserStore((state) => state.setEmail);

  useEffect(() => {
    const user = async () => {
      const session = await supabase.auth.getSession();
      // console.log('session', session);
      setUserEmail(session.data.session?.user?.user_metadata?.email);
    }
    user();
  }, [])


  return (
    <div>
      <Header >홈피드</Header>
      <div className='content'>
        <FeedList />
      </div>
      <BottomMenu />
    </div>
  );
}
