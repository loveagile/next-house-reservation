import Button from "@mui/material/Button";
import InputField from "@/components/molecules/Input/InputField";
import { IoSearchSharp } from "react-icons/io5";

import { useForm } from "react-hook-form";

interface ThisFCProps {
  setKeyword: (keyword: string) => void;
}

const GroupSearchBar: React.FC<ThisFCProps> = ({ setKeyword }) => {
  const { control, handleSubmit } = useForm<{ keyword: string }>();


  const onSubmit = ({ keyword }: { keyword: string }) => {
    setKeyword(keyword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex border-b-[1px] pb-3 border-[#eee] mb-5">
        <span className="flex items-center">
          <strong className="text-sm">参加中</strong>
        </span>
        <div className="ml-auto flex items-center gap-1">
          <InputField id="keyword" placeholder="キーワード" control={control} className="w-[350px]" />
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

export default GroupSearchBar;
