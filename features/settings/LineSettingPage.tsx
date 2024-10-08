import { QRCodeSVG } from 'qrcode.react';

export default function LineSettingPage() {
  const valueToEncode = "https://line.me/R/ti/p/%40856quisd";
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
          LINE通知設定
        </h1>
      </div>
      <div className="bg-white w-full p-5 text-[15px]">
        <h2 className='text-lg font-bold mb-4'>LINEユーザー登録</h2>
        <p className='leading-8'>
          LINEユーザーが未登録です。<br></br>
          以下のQRコードをLINEで読み取って、LINEユーザー登録を行ってください。
        </p>
        <div className="my-2">
          <QRCodeSVG value={valueToEncode} />
        </div>
        <p>既に友達登録済みの場合は、一度、友だち登録を解除し、もう一度友だち登録を行ってください。</p>
        <hr className='my-4 border-[#ccc]' />
        <p className='my-2'>解除方法</p>
        <ol className='list-decimal pl-8'>
          <li>LINEの友達を「ブロック」</li>
          <li>「設定」＞「友達」＞「ブロックリスト」を開く</li>
          <li>ブロックしているユーザーを選択し、「削除」</li>
        </ol>
      </div>
    </div >
  );
}

