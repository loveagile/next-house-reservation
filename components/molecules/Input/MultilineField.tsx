import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface IMultilineFieldProps {
  id: string;
  value?: string;
  control: Control<any>;
  className?: string;
  disabled?: boolean;
}

const MultilineField: React.FC<IMultilineFieldProps> = ({
  id,
  value,
  control,
  className,
  disabled
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
          className={`w-full max-w-[640px] ${className}`}
          disabled={disabled}
          rows={5}
          multiline
          variant="outlined"
          sx={{
            '& .MuiInputBase-input': {
              fontSize: "15px",
            },
            '& .Mui-disabled': {
              background: '#e6e6e6',
              fontWeight: 700,
            }
          }}
        />
      )}
    />
  );
};

export default MultilineField;
