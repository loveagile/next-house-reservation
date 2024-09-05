import InputField from "@/components/molecules/InputField";
import SelectBox from "@/components/molecules/SelectBox";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { types, status } from "@/utils/constants";
import { useForm } from "react-hook-form";

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
        <span className="flex items-center">
          全<strong className="text-xl mx-1 text-m-blue">{totalCounts}</strong>件
        </span>
        <div className="ml-auto flex items-center gap-1">
          <InputField id="keyword" placeholder="キーワード" control={control} className="w-[200px]" />
          <SelectBox id="type" names={types} control={control} className="max-w-[200px]" />
          <SelectBox id="status" names={status} control={control} className="max-w-[200px]" />
          <Button type="submit" variant="contained" sx={{
            minWidth: '70px',
            padding: "2px 0",
            borderRadius: '1px',
          }}>
            <SearchRoundedIcon />検索
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
