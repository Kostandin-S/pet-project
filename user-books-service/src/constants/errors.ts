export const ErrorMessages = {
  INVALID_ID: "The ID provided is invalid",
  MISSING_REQ_BODY: "Request body is missing or empty.",
  ENV_VARS_MISSING: "Environment variable were not extracted",
  NO_TOKEN_PROVIDED: "No token provided, authentication failed.",
  TOKEN_HAS_EXPIRED: "Token has expired",
  MISSING_ROLE:
    "You do not have the specified role to interact with this feature",
  // book
  TITLE_REQUIRED: "Title is a required field",
  AUTHOR_REQUIRED: "Author name is required",
  BOOK_ALREADY_ASSIGNED: "You already have this book to your collection",
  MIN_RATING: "Rating must be at least 1",
  MAX_RATING: "Rating must be at most 5",
  DESC_TOO_SHORT: "Description must be at least 10 characters",
  BOOK_NOT_FOUND: "Book with the provided ID was not found",
  BOOK_ALREADY_EXISTS: "Book already exists",
};
