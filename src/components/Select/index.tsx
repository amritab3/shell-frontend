import React, { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";

import { SelectItemType } from "@/utils/schema";

interface CustomSelectProps {
  id: string;
  label: string;
  selectItems: Array<SelectItemType & MenuItemProps>;
}

export default function Select(props: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const { id, label, selectItems, ...rest } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        id={id}
        value={selectedValue}
        label={label}
        onChange={handleChange}
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
