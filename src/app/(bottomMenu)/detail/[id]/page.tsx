'use client';
import { fetchTranscript } from '@/api/youtube';
import YoutubeVideo from '@/components/youtubeVideo/YoutubeVideo';
import { videoData } from '@/data/sampleVideoData';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import s from './detail.module.scss';
import YoutubeData from '@/components/youtubeVideo/YoutubeData';
import YoutubeScript from '@/components/youtubeVideo/YoutubeScript';
import PageAction from '@/components/pageAction/PageAction';
import { useQuery } from '@tanstack/react-query';
import { getFeedIDApi } from '@/api/board';
import YoutubeTag from '@/components/youtubeTag/YoutubeTag';
import Loading from '@/components/loading/Loading';

// NOTE: isViewing: number 가 필요할수도있음.
const DetailPage = () => {
  const params = useParams<{ id: string }>();
  const [script, setScript] = useState<any>();
  const [group, setGroup] = useState<number>(0);
  // 유튜브 재생 시간
  const [videoTime, setVideoTime] = useState(0);

  const videoIndex = parseInt(params.id);

  const { data, isSuccess, isLoading } = useQuery({
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

  return (
    <div className={s.detail_page}>
      {isSuccess &&
        <>
          <YoutubeVideo videoId={data[0]?.youtube_link} onTimeUpdate={handleTimeUpdate} />
          <div className='flex flex-col overflow-hidden'>
            <YoutubeData videoId={data[0]?.youtube_link} />
            <YoutubeTag value={data[0]?.tag} disabled className={s.edit_textarea} />
            <YoutubeScript videoTime={videoTime} videoId={data[0]?.youtube_link} />
          </div>
        </>
      }
      {isLoading && <Loading />}
    </div>
  );
};

export default DetailPage;

export const runtime = 'edge';