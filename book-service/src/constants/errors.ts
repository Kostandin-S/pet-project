export const ErrorMessages = {
  TITLE_REQUIRED: "Title is a required field",
  AUTHOR_REQUIRED: "Author name is required",
  BOOK_NOT_FOUND: "Book with the provided ID was not found",
  BOOK_ALREADY_EXISTS: "Book already exists",
  INVALID_ISBN_FORMAT:
    "Invalid ISBN format. Must be either a valid ISBN-10 or ISBN-13.",
  BOOK_NOT_FOUND_IN_OUR_LIBRARY:
    "The provided book data could not be found in our library",
  BOOK_NOT_ADDED: "There was an issue adding the book to the collection",
  INVALID_ID: "The ID provided is invalid",
  MISSING_REQ_BODY: "Request body is missing or empty.",
  ENV_VARS_MISSING: "Environment variable were not extracted",
  MISSING_ROLE:
    "You do not have the specified role to interact with this feature",
  TOKEN_HAS_EXPIRED: "Token has expired",
  NO_TOKEN_PROVIDED: "No token provided, authentication failed.",
  GENRE_REQUIRED: "Genre is a required query param",
};
