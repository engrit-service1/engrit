'use client';
import { postInquiry } from '@/api/inquiries';
import BottomMenu from '@/components/bottomMenu/BottomMenu';
import { layoutStore } from '@/store/layoutStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Bottom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const menuState = layoutStore((state) => state.menuState);
  const text = layoutStore((state) => state.text);

  const inquiryMutation = useMutation({
    mutationFn: (text: string) => postInquiry(text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getInquiriesList'] })
      router.back();
    }
  })

  const handleClick = () => {
    inquiryMutation.mutate(text);
  };

  return (
    <>
      <BottomMenu>
        <button onClick={handleClick} disabled={menuState}>문의하기</button>
      </BottomMenu>
    </>
  );
};

export default Bottom;