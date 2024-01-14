import Button from '@/components/Button';
import Input from '@/components/Input';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Unstable_Grid2';

const LoginPage = () => {
    return (
        <Grid container direction="column">
            <Grid className="title">Sign In</Grid>

            <Grid container direction="column" className="input-form">
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

                <Button variant="contained">Log In</Button>
            </Grid>
            <Grid>
                <span>Forgot Password?</span>
            </Grid>
            <Grid>
                <Button variant="text">create an account</Button>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
