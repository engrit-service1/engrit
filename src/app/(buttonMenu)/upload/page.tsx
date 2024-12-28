'use client';
import YoutubeTag from '@/components/youtubeTag/YoutubeTag';
import YoutubeData from '@/components/youtubeVideo/YoutubeData';
import YoutubeScript from '@/components/youtubeVideo/YoutubeScript';
import YoutubeVideo from '@/components/youtubeVideo/YoutubeVideo';
import { layoutStore } from '@/store/layoutStore';
import { useEffect, useState } from 'react';
import s from './upload.module.scss';

const UploadPage = () => {
  const { setMenuState, setText, setTag } = layoutStore((state) => ({
    setMenuState: state.setMenuState,
    setText: state.setText,
    setTag: state.setTag
  }));
  const [inputText, setInputText] = useState<string>("");
  const [videoId, setViedoId] = useState<string>("");
  const [videoTime, setVideoTime] = useState(0);
  const [videoTag, setVideoTag] = useState([]);
  const [videoTagCount, setVideoTagCount] = useState(0);

  useEffect(() => {
    if (videoId != '') {
      setMenuState(false);
      setText(videoId);
    }
  }, [videoId])

  const onChange = (e: any) => {
    setInputText(e.target.value);
  }
  const preView = () => {
    const link = inputText.split('?v=')[1]
    setViedoId(link);
  }

  const handleTimeUpdate = (time: number) => {
    setVideoTime(time);
  };

  return (
    <>
      <div className={s.input}>
        <input type="text" name="" id="" value={inputText} onChange={onChange} placeholder='ex) https://www.youtube.com/watch?v=xxxxx' />
        <button onClick={preView}>확인</button>
      </div>
      {
        // 확인 누르면 유튜브 정보 미리보기 해야됨.
        videoId &&
        <>
          <YoutubeVideo videoId={videoId} onTimeUpdate={handleTimeUpdate} />
          <YoutubeData videoId={videoId} />
          <YoutubeTag />
          <YoutubeScript videoTime={videoTime} videoId={videoId} viewLength={1} />
        </>
      }
    </>
  );
};

export default UploadPage;