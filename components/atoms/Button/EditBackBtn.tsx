import Link from "next/link";

interface ThisFCProps {
  className?: string;
  linkUrl: string;
}

const EditBackBtn: React.FC<ThisFCProps> = ({ linkUrl, className = "" }) => {
  return (
    <div className="inline-block mr-auto hover:opacity-70">
      <Link href={linkUrl} className={`flex items-center ${className}`}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
            height="20"
          >
            <path
              d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L392 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-214.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z"
              fill="#1565c0"
            />
          </svg>
        </span>
        <span className="text-[#1565c0] text-lg ml-2">戻る</span>
      </Link>
    </div>
  );
};

export default EditBackBtn;
