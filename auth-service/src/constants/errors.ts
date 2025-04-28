export const ErrorMessages = {
  // Service related errors
  FIRST_NAME_REQUIRED: "First name is a required field",
  LAST_NAME_REQUIRED: "Last name is a required field",
  NICKNAME_MIN_LENGTH: "Nickname should be at least 3 characters",
  BIO_MIN_LENGTH: "Bio should be at least 3 characters",
  INVALID_EMAIL: "The provided email format is invalid",
  DUPLICATE_EMAIL: "This email already exists!",
  INVALID_CREDENTIALS: "Invalid email address or password!",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
  PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter",
  PASSWORD_LOWERCASE: "Password must contain at least one lowercase letter",
  PASSWORD_NUMBER: "Password must contain at least one number",
  PASSWORD_SPECIAL_CHAR: "Password must contain at least one special character",
  SOMETHING_WENT_WRONG: "Something Went Wrong",

  // Middleware-related errors
  MISSING_REQ_BODY: "Request body is missing or empty.",

  // Environment errors
  ENV_VARS_MISSING: "Environment variable were not extracted",

  // Token-related errors
  TOKEN_HAS_EXPIRED: "Token has expired",
  NO_TOKEN_PROVIDED: "No token provided, authentication failed.",

  // Session-related errors
  INVALID_SESSION: "The provided session is either invalid or missing",
};
