'use client';
import React, { useRef, useState } from 'react';
import { BookmarkFill, BookmarkLine } from '../images';
import DropDown from '../dropDown/DropDown';
import ShareModal from '../portalModal/shareModal/ShareModal';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import Bookmark from '../bookmark/Bookmark';

const PageAction = ({ onClick, data, isBookmark }: {
  onClick: (e: React.MouseEvent) => void;
  data: any;
  isBookmark: boolean;
}) => {
  const targetRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClick(e);
  };

  useOutOfClick(targetRef, () => {
    setDropDown(false);
  });

  return (
    <div onClick={handleClick}>
      <div className='w-20 h-20 cursor-pointer'>
        <Bookmark isBookmark={isBookmark} sendId={data?.id} />
      </div>
      <DropDown sendUploader={data?.uploader} />
      {
        shareModal && <ShareModal setOnModal={() => setShareModal(false)} />
      }
    </div>
  );
};

export default PageAction;