import InputField from "@/components/molecules/InputField/InputField";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { types, status } from "@/utils/constants";
import { useForm } from "react-hook-form";
import "./SearchBar.css";

export interface ISearchForm {
  keyword: string;
  type: string;
  status: string;
}

interface ISearchBarProps {
  totalCounts: number;
  setSearchData: (value: ISearchForm) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  totalCounts,
  setSearchData,
}) => {
  const { control, handleSubmit } = useForm<ISearchForm>();
  const onSubmit = (data: ISearchForm) => {
    setSearchData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex border-b-[1px] pb-3 border-[#eee] mb-5">
        <span>
          全
          <strong className="text-[20px] mx-1 text-[#1976d2]">
            {totalCounts}
          </strong>
          件
        </span>
        <div className="ml-auto flex gap-1">
          <InputField id="keyword" placeholder="キーワード" control={control} className="w-[200px]" />
          <SelectBox id="type" names={types} control={control} className="max-w-[200px]" />
          <SelectBox id="status" names={status} control={control} className="max-w-[200px]" />
          <Button type="submit" className="search_btn" variant="contained">
            <SearchRoundedIcon />
            検索
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
