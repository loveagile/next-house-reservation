"use client";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

interface ThisFCProps {
  status: string;
}

const StatusField: React.FC<ThisFCProps> = ({ status }) => {
  return (
    <>
      {status === "非公開(下書き)" ? (
        <VisibilityOffRoundedIcon sx={{
          margin: "0 4px",
          fontSize: "28px",
          color: "#737373",
        }} />
      ) : status === "公開(開催終了)" ? (
        <RemoveRedEyeIcon sx={{
          margin: "0 4px",
          fontSize: "28px",
          color: "#737373",
        }} />
      ) : (
        <RemoveRedEyeIcon sx={{
          margin: "0 4px",
          fontSize: "28px",
          color: "#2aac6d",
        }} />
      )}
      <span className="text-sm font-bold">{status}</span>
    </>
  );
};

export default StatusField;
