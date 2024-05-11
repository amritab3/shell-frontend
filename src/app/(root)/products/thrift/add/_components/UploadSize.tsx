"use client";

import React, { useState } from "react";

import { Controller, useController } from "react-hook-form";
import Grid from "@mui/material/Grid";

import Input from "@/components/Input";

import { FormInputProps, FormSelectOption } from "@/utils/schema";
import Select from "@/components/Select";
import URLS from "@/utils/urls";

const UploadSize = (props: FormInputProps) => {
  const { name, control, ...rest } = props;
  const [size, setSize] = React.useState("");
  const [productSizeChoices, setProductSizeChoices] = useState(
    [] as Array<FormSelectOption>,
  );

  const { field } = useController({
    name,
    control,
  });

  React.useEffect(() => {
    if (!field.value[0].size) {
      setSize("");
    }
  }, [field.value]);

  React.useEffect(() => {
    fetch(URLS.PRODUCT_SIZE_CHOICES, {
      method: "GET",
    }).then(async (resp) => {
      const data: Array<FormSelectOption> = await resp.json();
      setProductSizeChoices(data);
    });
  }, []);

  const handleProductSizeChange = (e: any) => {
    setSize(e.target.value);
  };

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
          <Select
            id="size"
            label="Size"
            selectItems={productSizeChoices}
            value={size}
            onChange={(e: any) => {
              handleProductSizeChange(e);
              onChange([
                {
                  size: e.target.value.toUpperCase(),
                  size_inventory: value[0].size_inventory,
                },
              ]);
            }}
          />
        </Grid>
      )}
    />
  );
};

export default UploadSize;
