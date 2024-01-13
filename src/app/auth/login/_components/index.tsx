import Button from "@/components/Button";

const LoginPage = () => {
    
return (
    <div>
        <div className="title">Sign In</div>
        <div className="input-form">

        <Button variant="contained">Log In</Button>
        </div>
        <div>
            <span>Forgot Password?</span>
        </div>
        <div><Button variant="text">create an account</Button></div>
    </div>
)
}

export default LoginPage;