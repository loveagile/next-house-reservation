import Button from "@mui/material/Button";
import InputField from "@/components/molecules/Input/InputField";
import SelectBox from "@/components/molecules/Input/SelectBox";
import { IoSearchSharp } from "react-icons/io5";

import { types, sortMethods } from "@/utils/constants";
import { useForm } from "react-hook-form";

export interface IReservationSearchForm {
  sortMethod: string;
  keyword: string;
  type: string;
}

interface ThisFCProps {
  totalCounts: number;
  searchData: IReservationSearchForm;
  setSearchData: (searchData: IReservationSearchForm) => void;
}

const ReservationSearchBar: React.FC<ThisFCProps> = ({
  totalCounts,
  searchData,
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
          全<strong className="text-xl mx-1 text-[#1976d2]">{totalCounts}</strong>件
        </span>
        <div className="ml-auto flex items-center gap-1">
          <SelectBox id="sortMethod" names={sortMethods} control={control} value={searchData.sortMethod} className="max-w-[150px]" />
          <InputField id="keyword" placeholder="キーワード" control={control} value={searchData.keyword} className="max-w-[200px]" />
          <SelectBox id="type" names={types} control={control} value={searchData.type} className="max-w-[200px]" />
          <Button type="submit" variant="contained" sx={{
            minWidth: '70px',
            padding: "4px 1px",
            borderRadius: '1px',
          }}>
            <IoSearchSharp className="text-base mr-[2px]" />
            <span className="text-sm">検索</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReservationSearchBar;
