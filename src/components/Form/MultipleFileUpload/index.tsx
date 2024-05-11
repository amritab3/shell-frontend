import React from "react";

import { Controller, useController } from "react-hook-form";
import MuiButton, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { FormInputProps } from "@/utils/schema";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

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

  const { field } = useController({
    name,
    control,
  });

  return (
    <Grid container item xs={12} alignItems={"center"} gap={2}>
      <Grid item xs={5}>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <>
              <MuiButton
                fullWidth
                color={color}
                variant={variant}
                component="label"
                role={undefined}
                type="button"
                startIcon={<CloudUploadIcon />}
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
                  accept={"image/*"}
                />
              </MuiButton>
              {value.length ? (
                <Typography variant="body2" component="p">
                  {value.length} image(s) uploaded
                </Typography>
              ) : null}
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default MultipleFileUpload;
