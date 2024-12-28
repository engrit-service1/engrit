'use client';
import { postPeed } from '@/api/board';
import BottomMenu from '@/components/bottomMenu/BottomMenu';
import { layoutStore } from '@/store/layoutStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Bottom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { menuState, text, tag } = layoutStore((state) => ({
    menuState: state.menuState,
    text: state.text,
    tag: state.tag
  }));

  const uploadeFeedMutation = useMutation({
    mutationFn: ({ text, tag }: { text: string; tag: any }) => postPeed(text, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getFeedList'] })
      // redirect('/');
      router.back();
    }
  })

  const handleClick = () => {
    uploadeFeedMutation.mutate({ text, tag });
  };

  return (
    <>
      <BottomMenu>
        <button onClick={handleClick} disabled={menuState}>업로드</button>
      </BottomMenu>
    </>
  );
};

export default Bottom;