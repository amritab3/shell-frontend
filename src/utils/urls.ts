const BASE_URL = "http://localhost:8000";

const URLS = {
  USER_LOGIN_URL: `${BASE_URL}/auth/login/`,
  USER_REGISTER_URL: `${BASE_URL}/users/register/`,
  GENERATE_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/generate-otp/`,
  VERIFY_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/verify-otp/`,
  UPDATE_PASSWORD: `${BASE_URL}/auth/update-password/`,
  USER_URL: `${BASE_URL}/users`,

  LIST_PRODUCTS: `${BASE_URL}/products`,
  LIST_INSTORE_PRODUCTS: `${BASE_URL}/products/instore/`,
  LIST_THRIFT_PRODUCTS: `${BASE_URL}/products/thrift/`,
  LIST_MEN_PRODUCTS: `${BASE_URL}/products/men/`,
  LIST_WOMEN_PRODUCTS: `${BASE_URL}/products/women/`,
  LIST_KIDS_PRODUCTS: `${BASE_URL}/products/kids/`,

  LIST_USERS: `${BASE_URL}/users/`,
};

export default URLS;
