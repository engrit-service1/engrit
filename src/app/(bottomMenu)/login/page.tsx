'use client';

import Button from "@/components/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import s from './loginPage.module.scss';
import { useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";

const Index = () => {
  const router = useRouter();

  const click = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=90dfb6439cebafe3e61ec13e051adbe6&redirect_uri=http://localhost:3000/oauth/kakao`
    );
  };

  const signInWithKakao = async () => {
    const supabase = createClient();
    // await supabase.auth.signInWithOAuth({
    //   provider: 'kakao',
    //   // options: { redirectTo: `http://localhost:3000/api/auth/callback` },
    // });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      // options: { redirectTo: `http://localhost:3000/api/auth/callback` },
      // options: { redirectTo: location.origin + "/api/auth/callback", },
      options: { redirectTo: location.origin + "/auth/callback", },
    })
  };


  return (
    <>
      <div className={s.login_page}>
        <div className={s.logo}>
          <Image src="/image/logo.svg" alt="logo" width={500} height={500} />
        </div>
        <Button
          onClick={signInWithKakao}
          className={`${s.login_btn} h-38`}
          full
        >
          카카오 로그인
        </Button>
      </div>
    </>
  );
};

export default Index;
