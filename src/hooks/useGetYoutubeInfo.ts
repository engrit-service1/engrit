import { getBookmarkFeedApi, readPeedApi } from "@/api/board";
import { youtubeInfoApi } from "@/api/youtube";
import { useQuery } from "@tanstack/react-query";

export function useGetYoutubeInfoLink(Link: string) {
  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(Link),
    queryKey: ["youtubeLink", Link],
    enabled: Boolean(Link),
  });

  const playTime = youtubeInfo?.contentDetails?.duration;
  const title = youtubeInfo?.snippet?.title;
  const channelTitle = youtubeInfo?.snippet?.channelTitle;
  const thumbNail = youtubeInfo?.snippet?.thumbnails?.default?.url;

  return { playTime, title, channelTitle, thumbNail, youtubeInfoLoading };
}
