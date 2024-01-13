import * as React from 'react';
import MuiTextField,{TextFieldVariants} from '@mui/material/TextField';

type InputTypes ={
    variant: TextFieldVariants;
    label: string;
    type?: string;

}
const Input = (props: InputTypes) => {
    const {variant, label, type} = props;

    return(
        <MuiTextField label={label} variant={variant} type={type || "text"} />
        
    );
}

export default Input;