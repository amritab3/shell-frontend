import React from "react";

import { Controller } from "react-hook-form";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { FormInputProps } from "@/utils/schema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FormSelectOption } from "@/utils/schema";

interface FormSelectProps {
  label: string;
  options: Array<FormSelectOption>;
}

const FormSelect = (props: FormInputProps & SelectProps & FormSelectProps) => {
  const { name, control, label, options, fullWidth, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl fullWidth={fullWidth}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <MuiSelect
            label={label}
            onChange={onChange}
            value={value}
            fullWidth={fullWidth}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
