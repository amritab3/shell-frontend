"use client";

import React from "react";

import { Controller, useController } from "react-hook-form";
import Grid from "@mui/material/Grid";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { Typography } from "@mui/material";

import {
  removeObjectsWithEmptyKeys,
  deleteObjectFromArray,
} from "@/utils/Utils";
import { FormInputProps, UploadProductSize } from "@/utils/schema";

const UploadSizes = (props: FormInputProps) => {
  const { name, control } = props;
  const [size, setSize] = React.useState("");
  const [sizeInventory, setSizeInventory] = React.useState("");

  const { field } = useController({
    name,
    control,
  });

  React.useEffect(() => {
    setSize("");
    setSizeInventory("");
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
        <Grid container item xs={12}>
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
          >
            <Grid item xs={4}>
              <Input
                label={"Size"}
                size={"small"}
                value={size}
                onChange={(e) => setSize(e.target.value.toUpperCase())}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                label={"In Stock"}
                size={"small"}
                value={sizeInventory}
                onChange={(e) => setSizeInventory(e.target.value.toUpperCase())}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                label={"Add Size"}
                variant="contained"
                onClick={() => {
                  const index = value.findIndex(
                    (item: any) => item.size === size,
                  );

                  if (index !== -1) {
                    const existingSizes: UploadProductSize[] = [...value];
                    const existingSize = existingSizes[index];

                    existingSizes[index] = {
                      size: existingSize.size,
                      size_inventory: sizeInventory,
                    };
                    onChange([...existingSizes]);
                    setSize("");
                    setSizeInventory("");
                  } else {
                    const newSize: UploadProductSize = {
                      size,
                      size_inventory: sizeInventory,
                    };
                    if (size) {
                      onChange([...value, newSize]);
                    }
                    setSize("");
                    setSizeInventory("");
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container item direction="column">
            {removeObjectsWithEmptyKeys(value).map((sizeInput, index) => {
              return (
                <Grid
                  key={index + 1}
                  container
                  item
                  alignItems={"center"}
                  spacing={3}
                >
                  <Grid item>
                    <Typography>Size: {sizeInput.size}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      In Stock: {sizeInput.size_inventory}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      label={"Remove"}
                      onClick={() => {
                        const existingSizes = [...value];
                        const sizesAfterRemovingObject = deleteObjectFromArray(
                          existingSizes,
                          sizeInput,
                        );
                        onChange(sizesAfterRemovingObject);
                      }}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    />
  );
};

export default UploadSizes;
