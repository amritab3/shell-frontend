import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Button from '@/components/Button';
import Input from '@/components/Input';
import withNavLayout from '@/hoc/withNavLayout';

const RegisterPage = () => {
    return (
        <div>
            <div className="Title">Sign Up</div>
            <div className="input-form">
                <Input
                    variant="standard"
                    label="Your Name"
                    StartIcon={PersonIcon}
                />
                <Input
                    variant="standard"
                    label="Your Email"
                    StartIcon={MailIcon}
                />
                <Input
                    variant="standard"
                    label="Password"
                    type="password"
                    StartIcon={LockIcon}
                />
                <Input
                    variant="standard"
                    label="Repeat your password"
                    type="password"
                    StartIcon={LockOutlinedIcon}
                />

                <Button variant="contained">Register</Button>
            </div>
            <div>
                <p>Already have an account?</p>
                <Button variant="text">Login Here</Button>
            </div>
        </div>
    );
};

export default withNavLayout(RegisterPage);
