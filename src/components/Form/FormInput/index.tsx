import React from 'react';

import { useField, FieldHookConfig } from 'formik';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

interface FormInputTypes {
    StartIcon?: React.ElementType;
    EndIcon?: React.ElementType;
}

const FormTextField = (
    props: FormInputTypes & TextFieldProps & FieldHookConfig<string>,
) => {
    const {
        name,
        fullWidth,
        variant,
        label,
        type,
        StartIcon,
        EndIcon,
        ...rest
    } = props;
    const [field, meta] = useField(name);
    const [inputType, setInputType] = React.useState(type);
    const [showPassword, setShowPassword] = React.useState(false);

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

    // meta object contains
    // submitForm, isSubmitting, touched, errors
    // if (meta && meta.touched && meta.error) {
    //     field.error = true;
    //     configTextField.helperText = meta.error;
    // }

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
            {...field}
            {...rest}
        />
    );
};

export default FormTextField;
