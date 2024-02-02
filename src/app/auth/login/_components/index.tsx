import Button from '@/components/Button';
import Input from '@/components/Input';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Unstable_Grid2';
import styles from './login.module.css'


const LoginPage = () => {
    return (
        <Grid container className= {styles.main}>
            <Grid container columns={{sm:6, md:6, lg:6, xl:6}} className={styles.formWrapper}>
                <Grid className={styles.title}>
                    <h3>Sign In</h3>
                </Grid>

                <Grid container direction="column" className={styles.inputForm}>
                    <Input
                        variant="standard"
                        label="Username"
                        StartIcon={PersonIcon}
                    />
                    <Input
                        variant="standard"
                        label="Password"
                        type="password"
                        StartIcon={LockIcon}
                    />

                    <Button variant="outlined">Log In</Button>
                </Grid>
                <Grid>
                    <span>Forgot Password?</span>
                </Grid>
                <Grid>
                    <Button variant="text">create an account</Button>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default LoginPage;