"use client";

import "./InquiryInformationPage.css";

export default function InquiryInformationPage() {
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
          資料請求フォーム選択
        </h1>
        <p className="text-sm">資料請求内容を確認するフォームを選んでください。</p>
      </div>
      <div className="bg-white w-full p-5">
        <table className="w-full">
          <thead>
            <tr>
              <th>タイトル</th>
              <th>未対応・対応中件数</th>
              <th className="w-[150px]">詳細</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
}

