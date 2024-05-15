import React from "react";

import { Controller } from "react-hook-form";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { FormInputProps } from "@/utils/schema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
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
        field, 
        fieldState: { error },
        formState,
      }) => (
        <FormControl fullWidth={fullWidth}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <MuiSelect
            id={name}
            label={label}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            fullWidth={fullWidth}
            error={!!error}
            {...field}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>
          {error && (
            <FormHelperText error={!!error}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
