const BASE_URL = 'http://localhost:8000';

const URLS = {
    USER_LOGIN_URL: `${BASE_URL}/auth/login/`,
    USER_REGISTER_URL: `${BASE_URL}/users/register/`,
    GENERATE_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/generate-otp/`,
    VERIFY_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/verify-otp/`,
};

export default URLS;
