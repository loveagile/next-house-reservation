import InputField from "@/components/molecules/InputField/InputField";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { types, sortMethods } from "@/utils/constants";
import { useForm } from "react-hook-form";
import "./ReservationSearchBar.css";

export interface IReservationSearchForm {
  sortMethod: string;
  keyword: string;
  type: string;
}

interface IReservationSearchBarProps {
  totalCounts: number;
  setSearchData: (value: IReservationSearchForm) => void;
}

const ReservationSearchBar: React.FC<IReservationSearchBarProps> = ({
  totalCounts,
  setSearchData,
}) => {
  const { control, handleSubmit } = useForm<IReservationSearchForm>();
  const onSubmit = (data: IReservationSearchForm) => {
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
          <SelectBox id="sortMethod" names={sortMethods} control={control} className="max-w-[150px]" />
          <InputField id="keyword" placeholder="キーワード" control={control} />
          <SelectBox id="type" names={types} control={control} className="max-w-[200px]" />
          <Button type="submit" className="search_btn" variant="contained">
            <SearchRoundedIcon />
            検索
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReservationSearchBar;
