'use client';
import { deletePeedApi, getFeedIDApi } from '@/api/board';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import { UserStore } from '@/store/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { More } from '../images';
import ShareModal from '../portalModal/shareModal/ShareModal';
import s from './dropdown.module.scss';
import { createClient } from '@/util/supabase/client';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const DropDown = ({ sendUploader, className }: { sendUploader?: string; className?: string }) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [dropDown, setDropDown] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const targetRef = useRef(null);
  // const { email } = UserStore();
  const [email, setEmail] = useState<string | undefined>('');
  const setUserEmail = UserStore((state) => state.setEmail);

  const videoIndex = parseInt(params.id);

  useOutOfClick(targetRef, () => {
    setDropDown(false);
  });

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['feedId', videoIndex],
    queryFn: () => getFeedIDApi(videoIndex),
  })

  const showDropDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault()
    setDropDown(!dropDown)
  }

  const deleteFeedMutation = useMutation({
    mutationFn: (id: number) => deletePeedApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getFeedList'] })
    }
  })

  const deleteFeed = (id: number) => {
    deleteFeedMutation.mutate(id);
  }

  useEffect(() => {
    const user = async () => {
      const session = await supabase.auth.getSession();
      setEmail(session.data.session?.user?.user_metadata?.email);
    }
    user();
  }, [])

  return (
    <div className={classNames(twMerge('relative cursor-pointer w-28 h-28 mt-18', className))} onClick={showDropDown} ref={targetRef}>
      <More />
      {
        dropDown &&
        <ul className={s.dropdown}>
          {
            (data && data[0].uploader === email) || (sendUploader === email) ?
              <>
                <li onClick={() =>
                  router.push(`/edit/${data?.id}`)
                }> 수정</li>
                <li onClick={() => deleteFeed(data?.id)}>삭제</li>
              </> : null
          }
          <li onClick={() => setShareModal(true)}>공유</li>
        </ul>
      }
      {
        shareModal && <ShareModal setOnModal={() => setShareModal(false)} />
      }
    </div >
  );
};

export default DropDown;