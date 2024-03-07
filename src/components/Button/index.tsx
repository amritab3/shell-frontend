import * as React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps {
    label: string;
}

const Button = (props: CustomButtonProps & ButtonProps) => {
    const { label, ...rest } = props;
    return <MuiButton {...rest}>{label}</MuiButton>;
};

export default Button;
