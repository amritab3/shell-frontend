export const BASE_URL = "http://localhost:8000";

const URLS = {
  TOKEN_REFRESH_URL: `${BASE_URL}/auth/token/refresh/`,
  TOKEN_VERIFY_URL: `${BASE_URL}/auth/token/verify/`,

  USER_LOGIN_URL: `${BASE_URL}/auth/login/`,
  USER_REGISTER_URL: `${BASE_URL}/users/register/`,
  GENERATE_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/generate-otp/`,
  VERIFY_FORGOT_PASSWORD_OTP: `${BASE_URL}/auth/verify-otp/`,
  UPDATE_PASSWORD: `${BASE_URL}/auth/update-password/`,
  USER_URL: `${BASE_URL}/users`,

  PRODUCTS_URL: `${BASE_URL}/products`,
  LIST_PRODUCTS: `${BASE_URL}/products`,
  LIST_INSTORE_PRODUCTS: `${BASE_URL}/products/instore/`,
  LIST_THRIFT_PRODUCTS: `${BASE_URL}/products/thrift/`,
  LIST_MEN_PRODUCTS: `${BASE_URL}/products/men/`,
  LIST_WOMEN_PRODUCTS: `${BASE_URL}/products/women/`,
  LIST_KIDS_PRODUCTS: `${BASE_URL}/products/kids/`,

  THRIFT_PRODUCTS_URL: `${BASE_URL}/products/thrift`,

  LIST_USERS: `${BASE_URL}/users/`,

  ADD_ITEM_TO_CART: `${BASE_URL}/users/:userId/cart/add-item/`,
  GET_USER_CART: `${BASE_URL}/users/:userId/cart/`,
  DELETE_CART_ITEM: `${BASE_URL}/users/:userId/cart/delete-cart-item/`,

  ADMIN_ADD_USER: `${BASE_URL}/users/admin/user/`,
  ADMIN_ROLES_URL: `${BASE_URL}/users/admin/roles/`,

  CREATE_ORDER: `${BASE_URL}/orders/`,

  PRODUCT_GENDER_CHOICES: `${BASE_URL}/products/product-gender-choice/`,
  PRODUCT_CATEGORY_CHOICES: `${BASE_URL}/products/product-category-choice/`,
  PRODUCT_SIZE_CHOICES: `${BASE_URL}/products/product-size-choice/`,

  PRODUCT_COMMENT_URL: `${BASE_URL}/products/:productId/feedback/comments`,
  GET_USER_RATING: `${BASE_URL}/products/:productId/feedback/ratings/user-rating/`,
  ADD_RATING: `${BASE_URL}/products/:productId/feedback/ratings/`,

  GET_USER_CHAT_ROOMS: `${BASE_URL}/chats/chat-rooms/user-rooms/`,
};

export default URLS;
