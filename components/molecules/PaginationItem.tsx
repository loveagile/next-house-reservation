import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import "./PaginationItem.css";

interface IPaginationItem {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const PaginationItem: React.FC<IPaginationItem> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <Stack spacing={0}>
      <Pagination
        className="mx-auto mb-5"
        count={totalPages}
        onChange={(event: React.ChangeEvent<any>, page: number) =>
          setCurrentPage(page - 1)
        }
        sx={{
          '& .MuiButtonBase-root': {
            border: "1px solid #ddd",
            borderCollapse: "collapse",
            color: "#1976d2",
            fontSize: "18px",
            borderRadius: 0,
            margin: 0,
            width: "40px",
            height: "40px",
          },
          '& .Mui-selected': {
            backgroundColor: "#1976d2 !important",
            border: "1px solid #1976d2",
            borderCollapse: "collapse",
            color: "white",
          },
          '& .Mui-selected:hover': {
            backgroundColor: "#1976d2 !important",
          }
        }}
        page={currentPage + 1}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationItem;
