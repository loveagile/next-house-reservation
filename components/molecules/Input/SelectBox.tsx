import { FormControl, Select, MenuItem } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

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
    <FormControl
      size="small"
      className={className}
    >
      <Controller
        name={id}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Select
            {...field}
            id={id}
            sx={{
              '& .MuiSelect-select': {
                padding: '3px 15px',
                minWidth: '170px',
                fontSize: '15px',
              },
            }}
          >
            {names.map((name, index) => (
              <MenuItem
                value={name}
                key={index}
                sx={{
                  fontSize: '15px',
                }}
              >
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
