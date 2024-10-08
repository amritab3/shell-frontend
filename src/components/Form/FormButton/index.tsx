import React from 'react';

import MuiButton, { ButtonProps } from '@mui/material/Button';
import { useFormikContext } from 'formik';

interface CustomButtonProps {
    label: string;
}

const FormButton = (props: CustomButtonProps & ButtonProps) => {
    const { label, color, variant, ...rest } = props;
    const { submitForm, isSubmitting, isValid } = useFormikContext();

    const handleSubmit = () => {
        submitForm();
    };

    return (
        <MuiButton
            fullWidth
            color={color}
            variant={variant}
            onClick={handleSubmit}
            disabled={isSubmitting || !isValid}
            {...rest}
        >
            {label}
        </MuiButton>
    );
};

export default FormButton;
