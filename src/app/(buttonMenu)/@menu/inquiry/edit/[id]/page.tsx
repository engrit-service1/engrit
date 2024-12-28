'use client';
import { editInquiry } from '@/api/inquiries';
import BottomMenu from '@/components/bottomMenu/BottomMenu';
import { layoutStore } from '@/store/layoutStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

const Bottom = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const text = layoutStore((state) => state.text);
  const menuState = layoutStore((state) => state.menuState);

  const id = Number(pathname?.split('/')[3]);

  const inquiryEditMutation = useMutation({
    mutationFn: (text: string) => editInquiry(text, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getInquiriesList'] })
      router.back();
    }
  })

  const handleClick = () => {
    inquiryEditMutation.mutate(text);
  };

  return (
    <>
      <BottomMenu>
        <button onClick={handleClick} disabled={menuState}>수정완료</button>
      </BottomMenu>
    </>
  );
};

export default Bottom;