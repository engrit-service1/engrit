'use client';
import React, { useEffect, useState } from 'react';
import s from '../../inquiry.module.scss';
import { useLayoutContext } from '@/context/LayoutContext';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getInquiriesID } from '@/api/inquiries';

const InquiryEditPage = () => {
  const [text, setInputText] = useState('');
  const { setMenuState, setText } = useLayoutContext();
  const pathname = usePathname();

  const id = Number(pathname?.split('/')[3]);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["getInquiriesDetail", id],
    queryFn: () => getInquiriesID(id),
  });

  useEffect(() => {
    setMenuState(true);
  }, [])

  useEffect(() => {
    if (isSuccess && data && data[0]?.content_text) {
      setInputText(data[0].content_text);
    }
  }, [isSuccess, data]);

  const onChange = (e: any) => {
    const newValue = e.target.value;
    if (newValue.length > 1000) {
      alert('최대 1000자까지 입력 가능합니다.');
      return;
    }
    setInputText(newValue);
    if (newValue != data[0].content_text) {
      setMenuState(false);
    }
  }

  const onBluer = () => {
    setText(text);
  }

  console.log('data', data && data[0].content_text);

  return (
    <>
      {
        isSuccess &&
        <div className={s.inquiryPage}>
          <div className="title">문의내용</div>
          <div className='relative'>
            <textarea name="" id="" placeholder='문의 내용 입력' onChange={onChange} value={text} onBlur={onBluer}>
            </textarea>
            <div className='absolute bottom-0 w-full bg-[#eee]'></div>
          </div>
        </div>
      }
    </>
  );
};

export default InquiryEditPage;