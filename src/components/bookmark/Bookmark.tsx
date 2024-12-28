'use client';

import { bookmarkAddApi, bookmarkRemoveApi, getBookmarkFeedIDApi } from '@/api/board';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookmarkFill, BookmarkLine } from '../images';

const Bookmark = ({ isBookmark, sendId }: { isBookmark?: boolean; sendId?: number }) => {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  // const currentId = parseInt(params.id) || sendId;
  const currentId = sendId ? sendId : parseInt(params.id);

  const { data: bookmarkData, isSuccess } = useQuery({
    queryKey: ['bookmarkId', currentId],
    queryFn: () => getBookmarkFeedIDApi(currentId),
    enabled: Boolean(currentId),
  });

  const [bookmarkState, setBookmarkState] = useState(isBookmark);

  useEffect(() => {
    if (isSuccess) {
      setBookmarkState(!!bookmarkData?.[0]?.id);
    }
  }, [bookmarkData, isSuccess]);

  const bookmarkAddMutation = useMutation({
    mutationFn: () => bookmarkAddApi(currentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkId', currentId] });
      setBookmarkState(true);
      alert('북마크에 저장되었습니다.');
    },
  });

  const bookmarkRemoveMutation = useMutation({
    mutationFn: () => bookmarkRemoveApi(currentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkId', currentId] });
      setBookmarkState(false);
      alert('북마크가 삭제되었습니다.');
    },
  });

  const handleBookmarkToggle = () => {
    if (bookmarkState) {
      bookmarkRemoveMutation.mutate();
    } else {
      bookmarkAddMutation.mutate();
    }
  };

  return (
    <div className="cursor-pointer w-28 h-28" onClick={handleBookmarkToggle}>
      {bookmarkState ? <BookmarkFill /> : <BookmarkLine />}
    </div>
  );
};

export default Bookmark;
