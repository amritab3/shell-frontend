import React from "react";

import { Controller } from "react-hook-form";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { FormInputProps } from "@/utils/schema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface Option {
  label: string;
  value: any;
}

interface FormMultiSelectProps {
  label: string;
  options: Array<Option>;
}

const FormMultiSelect = (
  props: FormInputProps & SelectProps & FormMultiSelectProps,
) => {
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
            multiple
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

export default FormMultiSelect;
