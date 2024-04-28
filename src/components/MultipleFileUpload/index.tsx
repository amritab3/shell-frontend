import React from "react";

import MuiButton, { ButtonProps } from "@mui/material/Button";
import { useField, FieldHookConfig } from "formik";

import { styled } from "@mui/material/styles";

interface MultipleFileUploadProps {
  label: string;
}

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

const MultipleFileUpload = (
  props: MultipleFileUploadProps & ButtonProps & FieldHookConfig<string>,
) => {
  const { name, color, fullWidth, variant, label, type, ...rest } = props;
  const [field, meta, helpers] = useField(name);

  const onFileUpload = async (event: any) => {
    const files = event.target.files;
    await helpers.setValue(files);
  };

  return (
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
      <VisuallyHiddenInput type="file" multiple onChange={onFileUpload} />
    </MuiButton>
  );
};

export default MultipleFileUpload;
