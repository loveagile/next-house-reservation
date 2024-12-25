import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

interface ThisFCProps {
  status: string;
}

const StatusField: React.FC<ThisFCProps> = ({ status }) => {
  return (
    <>
      {status === "非公開(下書き)" ? (
        <BsFillEyeSlashFill className="mx-1 text-2xl text-[#737373]" />
      ) : status === "公開(開催終了)" ? (
        <BsFillEyeFill className="mx-1 text-2xl text-[#737373]" />
      ) : (
        <BsFillEyeFill className="mx-1 text-2xl text-[#2aac6d]" />
      )}
      <span className="text-sm font-bold">{status}</span>
    </>
  );
};

export default StatusField;
