import * as React from 'react';
import MuiButton from '@mui/material/Button';

type ButtonTypes = {
    variant: string;

}


export default function Button(props: ButtonTypes) {
    const {variant} = props;
    return <MuiButton variant={variant}>Hello world</MuiButton>;
}
