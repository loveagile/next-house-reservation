"use client";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./StatusField.css";

interface IStatusField {
  status: string;
}

const StatusField: React.FC<IStatusField> = ({ status }) => {
  return (
    <>
      {status === "非公開(下書き)" ? (
        <VisibilityOffRoundedIcon className="eye_icon my-1" />
      ) : status === "公開" ? (
        <RemoveRedEyeIcon className="eye_icon publish_icon my-1" />
      ) : (
        <RemoveRedEyeIcon className="eye_icon my-1" />
      )}
      <span className="text-sm font-bold">{status}</span>
    </>
  );
};

export default StatusField;
