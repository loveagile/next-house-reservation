import { useEffect, useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import { FormControl, FormControlLabel, RadioGroup, Radio, Checkbox } from '@mui/material';

import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import { IEventFormProps } from "@/features/events/edit/EventFormEdit";

interface ThisFCProps {
  formData: IEventFormProps;
  index: number;
  value: string;
  error?: string;
  onFormChange: (index: number, updatedValue: string) => void;
  disabled?: boolean;
}

const ManualMoreFormFC: React.FC<ThisFCProps> = ({ formData, index, value, error = "", onFormChange, disabled = false }) => {
  const { title, detail, type, choice, isNecessary } = formData;
  let choiceArray: string[] = choice ? choice.replace(/\n+$/, "").split("\n") : [];
  const [selectedCheckBoxs, setSelectedCheckBoxs] =
    useState<string[]>(value ? value.replace(/,+$/, "").split(",") : []);

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    if (event.target.checked) {
      setSelectedCheckBoxs((prev) => [...prev, value]);
    } else {
      setSelectedCheckBoxs((prev) => prev.filter((v) => v !== value));
    }
  };

  useEffect(() => {
    onFormChange(index, selectedCheckBoxs.join(","));
  }, [selectedCheckBoxs]);

  return (
    <div className="flex items-start w-full mt-8">
      <div className="flex mb-2 min-w-[230px] justify-end pr-5">
        <InputLabel>{title}</InputLabel>
        {isNecessary && <RequiredLabel />}
      </div>
      <div className="w-full">
        {type === "一行テキスト" && (
          <TextField
            className={`w-full max-w-[640px]`}
            onChange={(e) => onFormChange(index, e.target.value)}
            value={value}
            disabled={disabled}
            sx={{
              '& .MuiInputBase-input': {
                padding: '5px 12px 3px',
                fontSize: "15px",
              },
              '& .Mui-disabled': {
                background: '#e6e6e6',
                fontWeight: 700,
              }
            }}
          />
        )}

        {type === "複数行テキスト" && (
          <TextField
            className={`w-full max-w-[640px]`}
            rows={5}
            value={value}
            disabled={disabled}
            onChange={(e) => onFormChange(index, e.target.value)}
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

        {type === "ラジオボタン" && (
          <FormControl>
            {choiceArray.map((c, index) => (
              <FormControlLabel key={index} value={c} label={c}
                control={<Checkbox disabled={disabled}
                  onChange={(e) => handleCheckBoxChange(e, c)}
                  checked={selectedCheckBoxs.length ? selectedCheckBoxs.includes(c) : false}
                />}
                sx={{
                  '.MuiCheckbox-root': {
                    padding: "3px 10px",
                  }
                }} />
            ))}
          </FormControl>
        )}

        {type === "チェックボックス" && (
          <FormControl>
            <RadioGroup onChange={(e) => onFormChange(index, e.target.value)} value={value}>
              {choiceArray.map((c, index) => (
                <FormControlLabel key={index} value={c} control={<Radio disabled={disabled} />} label={c} sx={{
                  '.MuiRadio-root': {
                    padding: "3px 10px",
                  }
                }} />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {detail && <p className="text-sm mt-2">{detail}</p>}
        <p className="text-sm mt-3 text-m-red">{error}</p>
      </div>
    </div>
  );
}

export default ManualMoreFormFC;