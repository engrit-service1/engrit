'use client';
import { myYoutubeUplaodApi } from '@/api/youtube';
import PieChart from '@/components/chart/PieChart';
import { isLogin } from '@/util/authCookie';
import { useQuery } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import s from './mypage.module.scss';

const MyPage = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => myYoutubeUplaodApi(),
    queryKey: ['myYoutubeUpload']
  });

  return (
    <>
      <div>
        <div className={s.title}>이름이름</div>
        <div className="input_wrap">
          <input type="text" value={''} /><button>usrud</button>
        </div>
        <div className="input_wrap">
          <input type="text" /><button>usrud</button>
        </div>
      </div>
      <div>
        <div className="title">
          내가 올린 영상
          <span onClick={() => router.push('/mypage/upload')}>모두 보기</span>
        </div>
        <ul>d
          <li>
            <div>영상</div>
            <div>영상제목</div>
          </li>
        </ul>
      </div>
      <div>고객센터 링크</div>
      <div>회원탈퇴</div>
    </>
  );
};

export default MyPage;