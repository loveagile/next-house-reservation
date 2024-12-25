import React from "react";

export default function NotFound() {
  return (
    <div className="max-w-[800px] m-auto">
      <div className="bg-white text-center mt-20 w-full p-10">
        <h1 className="text-3xl font-bold">ページが見つかりません</h1>
        <p className="m-2 text-lg">アドレスが間違って入力されているか、ページが移動している可能性があります。</p>
      </div>
    </div>
  );
}
