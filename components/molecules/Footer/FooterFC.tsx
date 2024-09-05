import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";

export default function FooterFC() {
  return (
    <footer className="bg-[#2FA8B5]">
      <div className="flex items-center justify-around p-10 w-full max-w-[760px] text-white text-sm m-auto">
        <div className="leading-5">
          <Link href="https://smile-builders-hiraya.com/" className="text-xl font-bold block mb-3">
            スマイルビルダーズ‐姶良総合住宅展示場-
          </Link>
          <p>〒899-5432</p>
          <p>鹿児島県姶良市加治木町木田2511-1</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-base mb-2">＼ SNS更新中 ／</p>
          <Link href="https://www.instagram.com/smilebuilders.aira.hiraya/">
            <FaInstagram className="text-3xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
