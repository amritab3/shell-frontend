import React from "react";

import { Controller } from "react-hook-form";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import ErrorMessage from "@/components/ErrorMessage";
import { FormInputProps } from "@/utils/schema";

interface FormTextFieldProps {
  StartIcon?: React.ElementType;
  EndIcon?: React.ElementType;
}

const FormTextField = (
  props: FormInputProps & TextFieldProps & FormTextFieldProps,
) => {
  const { name, control, label, type, variant, EndIcon, StartIcon, ...rest } =
    props;
  const [inputType, setInputType] = React.useState(type);
  const [showPassword, setShowPassword] = React.useState(false);

  const passwordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    if (type === "password") {
      if (showPassword) {
        setInputType("text");
      } else {
        setInputType("password");
      }
    }
  }, [showPassword, type]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <MuiTextField
          fullWidth
          label={label}
          variant={variant}
          type={inputType || "text"}
          error={!!error}
          value={value}
          onChange={onChange}
          helperText={error ? error.message : null}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {StartIcon ? <StartIcon /> : null}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {type === "password" ? (
                  <IconButton onClick={passwordVisibilityToggle}>
                    {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ) : EndIcon ? (
                  <EndIcon />
                ) : null}
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      )}
    />
  );
};

export default FormTextField;
