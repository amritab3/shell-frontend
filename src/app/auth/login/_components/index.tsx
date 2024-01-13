import Button from "@/components/Button";
import Input from "@/components/Input";

const LoginPage = () => {
  return (
    <div>
      <div className="title">Sign In</div>

      <div className="input-form">
        <Input variant="standard" label="Username" />
        <Input variant="standard" label="Password" type="password" />

        <Button variant="contained">Log In</Button>
      </div>
      <div>
        <span>Forgot Password?</span>
      </div>
      <div>
        <Button variant="text">create an account</Button>
      </div>
    </div>
  );
};

export default LoginPage;
