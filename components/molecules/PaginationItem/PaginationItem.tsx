import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./PaginationItem.css";

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
        page={currentPage + 1}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationItem;
