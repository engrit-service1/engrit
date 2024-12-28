import { getBookmarkFeedApi, readPeedApi } from "@/api/board";
import { useQuery } from "@tanstack/react-query";

export function useMyBookMarked() {
  const { data: bookmarked, isSuccess } = useQuery({
    queryFn: () => getBookmarkFeedApi(),
    queryKey: ["bookmark"],
  });

  // NOTE: 보완필요
  // if(isSuccess) {

  // }
  const bookmarkedArray = bookmarked?.map((item: any) => item.t_youtube_id);
  return { bookmarked, bookmarkedArray, isSuccess };
}
