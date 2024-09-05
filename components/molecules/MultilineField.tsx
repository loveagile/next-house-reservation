import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface IMultilineFieldProps {
  id: string;
  value?: string;
  control: Control<any>;
  className?: string;
}

const MultilineField: React.FC<IMultilineFieldProps> = ({
  id,
  value,
  control,
  className
}) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          className={`w-full max-w-[500px] ${className}`}
          rows={5}
          multiline
          variant="outlined"
        />
      )}
    />
  );
};

export default MultilineField;
