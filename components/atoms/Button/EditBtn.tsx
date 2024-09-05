import Button from "@mui/material/Button";

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
    <Button
      href={linkUrl}
      className={className}
      variant="contained"
      sx={{
        padding: "4px 0",
        borderRadius: "1px",
        marginBottom: "12px",
        marginLeft: "auto",
      }}
    >
      {text}
    </Button>
  );
};

export default EditBtn;
