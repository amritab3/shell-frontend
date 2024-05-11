"use client";

import * as React from "react";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

interface InputTypes {
  StartIcon?: React.ElementType;
  EndIcon?: React.ElementType;
}

const Input = (props: InputTypes & TextFieldProps) => {
  const { variant, label, type, value, StartIcon, EndIcon, ...rest } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);
  const [shrink, setShrink] = React.useState(false);

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
    <MuiTextField
      fullWidth
      label={label}
      variant={variant}
      type={inputType || "text"}
      value={value}
      onFocus={() => setShrink(true)}
      onBlur={(e) => setShrink(!!e.target.value)}
      InputLabelProps={{ shrink: value ? Boolean(value) : shrink }}
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
      sx={{
        mt: 2,
        mb: 2,
      }}
      {...rest}
    />
  );
};

export default Input;
