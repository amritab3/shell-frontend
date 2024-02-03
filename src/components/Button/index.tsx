import * as React from 'react';
import MuiButton, { ButtonTypeMap } from '@mui/material/Button';

type ButtonTypes = {
    variant: ButtonTypeMap['props']['variant'];
};

export default function Button(props: React.PropsWithChildren<ButtonTypes>) {
    const { variant, children } = props;
    return (
        <div>
            <MuiButton fullWidth variant={variant} sx={{ mt: 2, mb: 2 }}>
                {children}
            </MuiButton>
        </div>
    );
}
