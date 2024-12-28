'use client';
import { getFeedIDApi } from '@/api/board';
import { fetchTranscript } from '@/api/youtube';
import YoutubeTag from '@/components/youtubeTag/YoutubeTag';
import YoutubeData from '@/components/youtubeVideo/YoutubeData';
import YoutubeScript from '@/components/youtubeVideo/YoutubeScript';
import YoutubeVideo from '@/components/youtubeVideo/YoutubeVideo';
import { layoutStore } from '@/store/layoutStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import s from './edit.module.scss';

const Edit = () => {
  const params = useParams<{ id: string }>();
  const setTag = layoutStore((state) => state.setTag);
  const [script, setScript] = useState<any>();
  const [group, setGroup] = useState<number>(0);
  // 유튜브 재생 시간
  const [videoTime, setVideoTime] = useState(0);

  const videoIndex = parseInt(params.id);

  const { data, isSuccess } = useQuery({
    queryKey: ['feedId', videoIndex],
    queryFn: () => getFeedIDApi(videoIndex),
  })

  useEffect(() => {
    const fetchData = async () => {
      const trans = await fetchTranscript(data[0]?.youtube_link);
      setScript(trans);
    };
    fetchData();

  }, [params])

  const handleTimeUpdate = (time: number) => {
    setVideoTime(time);
  };

  isSuccess && setTag(data[0]?.tag);

  return (
    <div className={s.edit_page}>
      {isSuccess &&
        <>
          <YoutubeVideo videoId={data[0]?.youtube_link} onTimeUpdate={handleTimeUpdate} />
          <div className='flex flex-col overflow-hidden'>
            <YoutubeData videoId={data[0]?.youtube_link} />
            <YoutubeTag value={data[0]?.tag} autoFocus className={s.edit_textarea} />
            <YoutubeScript videoTime={videoTime} videoId={data[0]?.youtube_link} />
          </div>
        </>
      }
    </div>
  );
};

export default Edit;
export const runtime = 'edge';