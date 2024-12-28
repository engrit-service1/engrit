'use client';
import React, { useState } from 'react';
import Support from './Support';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteInquiryApi, getInquiries } from '@/api/inquiries';
import s from './support.module.scss';
import { dayformat } from '@/util/day';
import Link from 'next/link';
import Loading from '../loading/Loading';
import Edit from '../images/Edit';
import { Delete } from '../images';
import { Modal } from '../portalModal/Modal';
import ConfirmModal from '../portalModal/confirmModal/ConfirmModal';
import { redirect, useRouter } from 'next/navigation';

const SupportList = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["getInquiriesList"],
    queryFn: () => getInquiries(),
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (id: number) => deleteInquiryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getInquiriesList'] })
    }
  })

  const deleteInquiry = (id: number) => {
    deleteInquiryMutation.mutate(id);
  }

  return (
    <div className={s.support}>
      {isLoading && <Loading />}
      {data?.map((item: any, index: any) => (
        <Link key={index} href={`/support/${item.id}`}>
          <span className={s.res}>{item.response_text ? '답변완료' : '답변준비중'}</span>
          {
            !item.response_text &&
            <div className={s.icon}>
              <Edit onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                router.push(`/inquiry/edit/${item.id}`);
              }} />
              <Delete
                onClick={(e: any) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // deleteInquiry(index + 1);
                  setModal(true);
                }}
              />
              {/* </span> */}
            </div>
          }
          <p className={s.content}>{item.content_text}</p>
          <span className={s.inquiried_at}>{dayformat(item.inquiried_at)}</span>
          {
            modal &&
            <ConfirmModal setOnModal={() => setModal(false)}>이 문의내용을 삭제하시겠습니까?
              <Modal.Buttons>
                <button>취소</button>
                <button
                  onClick={() => {
                    deleteInquiry(item.id);
                    setModal(false);
                  }
                  }
                >삭제</button>
              </Modal.Buttons>
            </ConfirmModal>
          }
        </Link>
      ))
      }

    </div >
  );
};

export default SupportList;