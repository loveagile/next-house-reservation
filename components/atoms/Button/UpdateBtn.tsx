import Button from "@mui/material/Button";

const UpdateBtn: React.FC = () => {
  return (
    <Button type="submit" variant="contained" sx={{
      maxWidth: "170px",
      fontSize: "20px",
      padding: "3px 25px",
      marginTop: "20px",
      borderRadius: "1px",
    }}>
      更新する
    </Button>
  );
};

export default UpdateBtn;
