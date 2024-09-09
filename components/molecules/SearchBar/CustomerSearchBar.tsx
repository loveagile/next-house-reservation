import InputField from "@/components/molecules/InputField";
import SelectBox from "@/components/molecules/SelectBox";
import Button from "@mui/material/Button";
import { IoSearchSharp } from "react-icons/io5";

import { customerEmployee, customerStatus } from "@/utils/constants";
import { useForm } from "react-hook-form";

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
        <div className="ml-auto flex items-center gap-1">
          <InputField id="keyword" placeholder="キーワード" control={control} className="w-[200px]" />
          <SelectBox id="employee" names={customerEmployee} control={control} className="max-w-[200px]" />
          <SelectBox id="status" names={customerStatus} control={control} className="max-w-[200px]" />
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

export default CustomerSearchBar;
