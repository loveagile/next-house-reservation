export default function InquiryContactPage() {
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
          お問い合わせフォーム選択
        </h1>
        <p className="text-sm">お問い合わせ内容を確認するフォームを選んでください。</p>
      </div>
      <div className="bg-white w-full p-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[#2fa8b5] p-3 text-white font-normal text-[15px]">タイトル</th>
              <th className="bg-[#2fa8b5] p-3 text-white font-normal text-[15px]">未対応・対応中件数</th>
              <th className="w-[150px] bg-[#2fa8b5] p-3 text-white font-normal text-[15px]">詳細</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
}

