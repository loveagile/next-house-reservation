import Link from "next/link";

interface ThisFCProps {
  linkUrl: string;
  text?: string;
  className?: string;
}

const EditBtn: React.FC<ThisFCProps> = ({
  linkUrl,
  text = "編集",
  className = "",
}) => {
  return (
    <Link href={linkUrl}
      className={`px-[18px] py-[5px] shrink-0 rounded-[1px] ml-auto bg-[#1976D2] text-white hover:opacity-90 ${className}`}
    >
      {text}
    </Link>
  );
};

export default EditBtn;
