'use client';
import { youtubeInfoApi } from '@/api/youtube';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { forwardRef, lazy, Ref, Suspense, useState } from 'react';
import PageAction from '../pageAction/PageAction';
import YoutubeData from '../youtubeVideo/YoutubeData';
import YoutubeScript from '../youtubeVideo/YoutubeScript';
import YoutubeVideo from '../youtubeVideo/YoutubeVideo';
import Loading from '../loading/Loading';
// const YoutubeScript = lazy(() => import('../youtubeVideo/YoutubeScript'));

type feedType = {
  data?: any;
  isBookmark: boolean;
  className?: string;
};

const Feed = forwardRef(({
  data,
  isBookmark,
  className
}: feedType, ref: Ref<HTMLDivElement>) => {

  const [videoTime, setVideoTime] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setVideoTime(time);
  };

  return (
    <div ref={ref}>
      <YoutubeVideo videoId={data?.youtube_link} onTimeUpdate={handleTimeUpdate} />
      <Link href={`/detail/${data?.id}`} className='block pt-16 pb-20 pl-20 pr-20'>
        <YoutubeData videoId={data?.youtube_link}>
          <PageAction onClick={(e: any) => { e.stopPropagation(); e.preventDefault() }} data={data}
            isBookmark={isBookmark}
          />
        </YoutubeData>
        <YoutubeScript videoTime={videoTime} videoId={data.youtube_link} viewLength={1} className={className} />
        <div className="text-[#40A9FF]">{data?.tag?.replace(/(?!^)(#)/g, ' $1')}</div>
      </Link>
    </div>
  );
});

Feed.displayName = "Feed";

export default Feed;