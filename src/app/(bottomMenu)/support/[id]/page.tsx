'use client';

import { getInquiriesID } from '@/api/inquiries';
import { layoutStore } from '@/store/layoutStore';
import { dayformatTime } from '@/util/day';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import s from '../support.module.scss';

const SupportDetail = () => {
  const setText = layoutStore((state) => state.setText);
  const params = useParams<{ id: string }>();
  const inquiryId = Number(params?.id);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["getInquiriesDetail", inquiryId],
    queryFn: () => getInquiriesID(inquiryId),
    // enabled: !!inquiryId,
  });

  if (isSuccess) {
    if (data[0]?.response_text) {
      setText('문의내용')
    } else {
      setText('문의하기')
    }
  }

  return (
    <div>
      {isSuccess &&
        <>
          <div className={s.inquiry}>
            <div className={s.title}>문의내용</div>
            <p>{data[0]?.content_text}</p>
            <div className={s.date}>{dayformatTime(data[0]?.inquiried_at)}</div>
          </div>
          {
            data[0]?.response_text &&
            <div className={s.response}>
              <div className={s.title}>답변</div>
              <p>{data[0]?.response_text}</p>
              <div className={s.date}>{dayformatTime(data[0]?.responsed_at)}</div>
            </div>
          }
        </>
      }
    </div>
  );
};

export default SupportDetail;
export const runtime = 'edge';
