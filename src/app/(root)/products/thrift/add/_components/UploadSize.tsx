"use client";

import React from "react";

import { Controller, useController } from "react-hook-form";
import Grid from "@mui/material/Grid";

import Input from "@/components/Input";

import { FormInputProps } from "@/utils/schema";

const UploadSize = (props: FormInputProps) => {
  const { name, control, ...rest } = props;
  const [size, setSize] = React.useState("");

  const { field } = useController({
    name,
    control,
  });

  React.useEffect(() => {
    if (!field.value[0].size) {
      setSize("");
    }
  }, [field.value]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Grid item xs={12}>
          <Input
            value={size}
            onChange={(e) => {
              setSize(e.target.value.toUpperCase());
              onChange([
                {
                  size: e.target.value.toUpperCase(),
                  size_inventory: value[0].size_inventory,
                },
              ]);
            }}
            sx={{
              "& .MuiTextField-root": {
                marginTop: 0,
                marginBottom: 0,
              },
            }}
            {...rest}
          />
        </Grid>
      )}
    />
  );
};

export default UploadSize;
