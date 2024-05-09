import React, { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectProps } from "@mui/material/Select";

import { SelectItemType } from "@/utils/schema";

interface CustomSelectProps {
  id: string;
  label: string;
  selectItems: Array<SelectItemType & MenuItemProps>;
}

export default function Select(props: CustomSelectProps & SelectProps) {
  const { id, label, selectItems, ...rest } = props;

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        id={id}
        label={label}
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        {...rest}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {selectItems.map((selectItem, index) => (
          <MenuItem key={index} value={selectItem.value}>
            {selectItem.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
