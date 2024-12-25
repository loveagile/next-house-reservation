import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface ThisFCProps {
  linkUrl: string;
  className?: string;
}

const DetailBackBtn: React.FC<ThisFCProps> = ({
  className = "",
  linkUrl,
}) => {
  return (
    <Link
      href={linkUrl}
      className={`m-5 text-[#2296f3] text-lg font-semibold ${className}`}
    >
      <KeyboardBackspaceIcon className="mr-2" />
      戻る（情報は保存されています）
    </Link>
  );
};

export default DetailBackBtn;
