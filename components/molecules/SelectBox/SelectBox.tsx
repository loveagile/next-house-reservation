import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Control, Controller } from "react-hook-form";
import "./SelectBox.css";

interface ISelectBoxProps {
  id: string;
  names: string[];
  value?: string;
  control: Control<any>;
  className?: string;
}

const SelectBox: React.FC<ISelectBoxProps> = ({
  id,
  names,
  value = names[0],
  control,
  className = "",
}) => {
  return (
    <FormControl className={`w-full ${className}`} size="small">
      <Controller
        name={id}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Select {...field} id={id}>
            {names.map((name, index) => (
              <MenuItem value={name} key={index}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectBox;
