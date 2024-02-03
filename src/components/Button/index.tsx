import * as React from 'react';
import MuiButton, { ButtonTypeMap } from '@mui/material/Button';

type ButtonTypes = {
    variant: ButtonTypeMap['props']['variant'];
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function Button(props: React.PropsWithChildren<ButtonTypes>) {
    const { variant, children, type } = props;
    return (
        <div>
            <MuiButton
                type={type}
                fullWidth
                variant={variant}
                sx={{ mt: 2, mb: 2 }}
            >
                {children}
            </MuiButton>
        </div>
    );
}
