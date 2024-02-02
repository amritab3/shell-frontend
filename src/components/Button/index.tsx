import * as React from 'react';
import MuiButton, {ButtonTypeMap} from '@mui/material/Button';
import styles from './button.module.css'

type ButtonTypes = {
    variant: ButtonTypeMap["props"]["variant"];

}


export default function Button(props: React.PropsWithChildren<ButtonTypes>) {
    const {variant,children} = props;
    return (
        <div className={styles.buttonWrapper}>
            <MuiButton fullWidth variant={variant}>{children}</MuiButton>
        </div>
    )
}
