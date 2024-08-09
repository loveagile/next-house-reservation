import Button from "@mui/material/Button";

interface IEditBtnProps {
  className?: string;
  linkUrl: string;
  text?: string;
}

const EditBtn: React.FC<IEditBtnProps> = ({
  className = "",
  linkUrl,
  text = "編集",
}) => {
  return (
    <Button
      href={linkUrl}
      className={`py-[5px] rounded-[1px]  mb-3 ml-auto ${className}`}
      variant="contained"
    >
      {text}
    </Button>
  );
};

export default EditBtn;
