import * as React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps {
    label: string;
}

const Button = (props: CustomButtonProps & ButtonProps) => {
    const { label, ...rest } = props;
    return (
        <div>
            <MuiButton {...rest}>{label}</MuiButton>
        </div>
    );
};

export default Button;
