import { useGetYoutubeInfoLink } from '@/hooks/useGetYoutubeInfo';
import React from 'react';

const YoutubeTitle = ({ Link }: { Link: string }) => {
  const { title, channelTitle, thumbNail } = useGetYoutubeInfoLink(Link)

  return (
    <>
      {title}
    </>
  );
};

export default YoutubeTitle;