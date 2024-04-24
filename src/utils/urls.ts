const BASE_URL = "http://localhost:8000";

const URLS = {
  USER_LOGIN_URL: `${BASE_URL}/auth/login/`,
  USER_REGISTER_URL: `${BASE_URL}/users/register/`,
  GENERATE_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/generate-otp/`,
  VERIFY_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/verify-otp/`,
  UPDATE_PASSWORD: `${BASE_URL}/auth/update-password/`,

  LIST_PRODUCTS: `${BASE_URL}/products`,
};

export default URLS;
