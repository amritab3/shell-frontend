'use client';

import * as React from 'react';
import MuiTextField, { TextFieldVariants } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

type InputTypes = {
    variant: TextFieldVariants;
    label: string;
    type?: string;
    StartIcon?: React.ElementType;
    EndIcon?: React.ElementType;
};

const Input = (props: InputTypes) => {
    const { variant, label, type, StartIcon, EndIcon } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputType, setInputType] = React.useState(type);

    const passwordVisibilityToggle = () => {
        setShowPassword(!showPassword);
    };

    React.useEffect(() => {
        if (type === 'password') {
            if (showPassword) {
                setInputType('text');
            } else {
                setInputType('password');
            }
        }
    }, [showPassword, type]);

    return (
        <MuiTextField
            fullWidth
            label={label}
            variant={variant}
            type={inputType || 'text'}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {StartIcon ? <StartIcon /> : null}
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {type === 'password' ? (
                            <IconButton onClick={passwordVisibilityToggle}>
                                {!showPassword ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
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
        />
    );
};

export default Input;
