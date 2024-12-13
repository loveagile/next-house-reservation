import React from "react";
import { Commet } from 'react-loading-indicators';

interface Props {
  className?: string;
}

export default function Loading({ className }: Props) {
  return (
    <div
      className={`fixed w-full h-screen flex z-50 items-center justify-center bg-white bg-opacity-100 ${className}`}
    >
      <Commet color="#2296f3" size="medium" text="" textColor="" />
      {/* <div
        className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-primary rounded-full"
        role="status"
        aria-label="loading"
      ></div> */}
    </div>
  );
}
