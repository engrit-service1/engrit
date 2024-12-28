import React from 'react';
import Lottie from "react-lottie-player";
import data from "./engrit-skeleton.json";

const FeedSkeleton = () => {
  return (
    <div>
      <Lottie
        loop
        animationData={data}
        play
      />
      <Lottie
        loop
        animationData={data}
        play
      />
    </div>
  );
};

export default FeedSkeleton;