'use client';
import { useGetYoutubeInfoLink } from '@/hooks/useGetYoutubeInfo';
import Image from 'next/image';

const YoutubeData = ({ videoId, children }:
  { videoId: string; children?: React.ReactNode }) => {

  const { title, channelTitle, thumbNail } = useGetYoutubeInfoLink(videoId)

  return (
    <div>
      <div className='flex'>
        <div className='w-full h-full mr-12 overflow-hidden rounded-full max-w-32 max-h-32 min-w-32 min-h-32'>
          {thumbNail &&
            <Image src={thumbNail} width={32} height={32} alt={title} />
          }
        </div>
        <div className='flex justify-between'>
          <div>
            <p className='text-[#262626'>{title}</p>
            <span className='text-[#8C8C8C]'>{channelTitle}</span>
          </div>
          <div className='flex flex-col'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeData;