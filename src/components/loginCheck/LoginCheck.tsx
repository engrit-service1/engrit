"use client";

// import { refreshTokenApi, userInfoApi } from '@/api/users';
// import { parseJwt } from '@/hooks/useParseJwt';
import { getCookie, removeCookie } from '@/util/authCookie';
// import { epochConvert } from '@/util/epochConverter';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

// 로그인 체크용 컴포넌트
const LoginCheck = () => {
  // const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  // const setRole = useSetRecoilState(userSelector("role"));
  // const setName = useSetRecoilState(userSelector('name'));
  const router = useRouter();

  // console.log('type', typeof getCookie("ticket-atk"), getCookie("ticket-atk")?.name)
  useEffect(() => {
    function chk() {
      // userInfoApi(getCookie("ticket-atk")).then((res) =>
      //   setRole(res?.data.role)
      // );
      // 토큰이 있고, 
      if (getCookie("ticket-atk")) {
        // setIsLogin(getCookie("ticket-atk") === undefined ? false : true);
        if (getCookie("ticket-atk") === undefined) {
          removeCookie('ticket-atk');

        } else {
          if (typeof getCookie("ticket-atk") === 'string') {
            // setName(parseJwt(getCookie('ticket-atk')).username);
            // console.log('유저네임 체크 : ', parseJwt(getCookie('ticket-atk')).username)
          } else {
            // setName(getCookie('ticket-atk').username);
          }
        }
      }
      if (getCookie('ticket-rtk')) {
        // console.log('현재 날짜가 만료시간보다 이전임 : ',
        //   epochConvert(parseJwt(getCookie('ticket-rtk').exp))
        // )
        if (getCookie("ticket-atk") === undefined) {
          // console.log('rtk 있고, atk 언디파인드');
          // setIsLogin(false);
          removeCookie('ticket-atk');
        }
        // trk만료
        // if (epochConvert(parseJwt(getCookie('ticket-rtk').exp))) {
          removeCookie('ticket-rtk');
          removeCookie('ticket-atk');
          router.push('/');
        // } else {
          // console.log('토큰 재갱신해야됨', res);
          // const res = refreshTokenApi(getCookie('ticket-rtk'));
          // res.then(() => {
          //   // TODO: atk 재갱신
          // })
          // res.catch(() => {
          //   removeCookie('ticket-rtk')
          // })
        // }
      }
    }
    chk();
    return () => {
      // console.log('2');
      chk();
    }
  }, [])

  return null;
}

export default LoginCheck