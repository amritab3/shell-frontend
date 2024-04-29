import React from "react";

import { Controller } from "react-hook-form";
import MuiButton, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { FormInputProps } from "@/utils/schema";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MultipleFileUpload = (props: ButtonProps & FormInputProps) => {
  const { name, control, color, fullWidth, variant, label, type, ...rest } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error }, formState }) => (
        <MuiButton
          fullWidth
          color={color}
          variant={variant}
          component="label"
          role={undefined}
          type="button"
          {...rest}
        >
          {label}
          <VisuallyHiddenInput
            type="file"
            multiple
            onChange={(event: any) => {
              const files = event.target.files;
              onChange(files);
            }}
          />
        </MuiButton>
      )}
    />
  );
};

export default MultipleFileUpload;
