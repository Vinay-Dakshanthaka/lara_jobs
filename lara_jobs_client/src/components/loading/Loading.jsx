import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-2 h-96 bg-indigo-500 ">
      <ArrowPathIcon className="w-8 h-8 animate-spin text-yellow-500" />
      <span className="text-4xl text-white animate-bounce ">Loading...</span>
      {/* <span className="animate- text-9xl">.</span>
      <span className="animate- text-9xl">.</span>
      <span className="animate- text-9xl">.</span> */}
    </div>
  );
};

export default Loading;
