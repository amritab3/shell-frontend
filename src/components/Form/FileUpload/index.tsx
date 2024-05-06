import React from "react";
import { useDispatch } from "react-redux";

import { Controller } from "react-hook-form";
import MuiButton, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { FormInputProps } from "@/utils/schema";
import { setAvatarUrl } from "@/redux/features/userSlice";

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

const FileUpload = (props: ButtonProps & FormInputProps) => {
  const { name, control, color, fullWidth, variant, label, type, ...rest } =
    props;
  const dispatch = useDispatch();

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
            onChange={(event: any) => {
              const file = event.target.files[0];
              const fileUrl = URL.createObjectURL(file);
              dispatch(setAvatarUrl(fileUrl));
              onChange(file);
            }}
          />
        </MuiButton>
      )}
    />
  );
};

export default FileUpload;
