'use client';
import { layoutStore } from '@/store/layoutStore';
import { useEffect, useState } from 'react';
import s from './inquiry.module.scss';

const InquiryPage = () => {
  const [inputText, setInputText] = useState('');
  const { setMenuState, setText } = layoutStore((state) => ({
    setMenuState: state.setMenuState,
    setText: state.setText,
  }));

  useEffect(() => {
    setMenuState(true);
  }, [])

  const onChange = (e: any) => {
    if (inputText) {
      setMenuState(false);
    }
    setInputText(e.target.value);
    // TODO: 텍스트 최대 1000천자까지 가능. 넘어가면 alert 띄우기
  }

  const onBlur = () => {
    if (inputText) {
      setText(inputText);
    }
  }



  return (
    <div className={s.inquiryPage}>
      <div className="title">문의내용</div>
      <div className='relative'>
        <textarea name="" id="" placeholder='문의 내용 입력' onChange={onChange} value={inputText} onBlur={onBlur}>
        </textarea>
        <div className='absolute bottom-0 w-full bg-[#eee]'></div>
      </div>
    </div>
  );
};

export default InquiryPage;