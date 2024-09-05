import InputField from "@/components/molecules/InputField";
import SelectBox from "@/components/molecules/SelectBox";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { customerEmployee, customerStatus } from "@/utils/constants";
import { useForm } from "react-hook-form";
import "./CustomerSearchBar.css";

export interface ICustomerSearchForm {
  keyword: string;
  employee: string;
  status: string;
}

interface ICustomerSearchBarProps {
  totalCounts: number;
  setSearchData: (value: ICustomerSearchForm) => void;
}

const CustomerSearchBar: React.FC<ICustomerSearchBarProps> = ({
  totalCounts,
  setSearchData,
}) => {
  const { control, handleSubmit } = useForm<ICustomerSearchForm>();
  const onSubmit = (data: ICustomerSearchForm) => {
    setSearchData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex border-b-[1px] pb-3 border-[#eee] mb-5">
        <span>
          全
          <strong className="text-xl mx-1 text-[#1976d2]">
            {totalCounts}
          </strong>
          件
        </span>
        <div className="ml-auto flex gap-1">
          <InputField id="keyword" placeholder="キーワード" control={control} className="w-[200px]" />
          <SelectBox id="employee" names={customerEmployee} control={control} className="max-w-[200px]" />
          <SelectBox id="status" names={customerStatus} control={control} className="max-w-[200px]" />
          <Button type="submit" className="search_btn" variant="contained">
            <SearchRoundedIcon />
            検索
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CustomerSearchBar;
