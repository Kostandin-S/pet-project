import { HttpStatusCode } from "axios";
import Util from "util";

export class BaseError extends Error {
  public readonly name: string;
  public readonly code: HttpStatusCode;
  public readonly message: string;
  public readonly details: unknown;

  constructor(
    httpCode: HttpStatusCode,
    name: string,
    message: string,
    details: unknown
  ) {
    super();
    this.code = httpCode;
    this.name = name;
    this.message = message;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  generateHttpResponse() {
    const details = this.code === 500 ? "" : this.details;

    return {
      name: this.name,
      message: this.message,
      details,
    };
  }

  generateLoggingInformation() {
    const details =
      typeof this.details === "object"
        ? Util.inspect(this.details)
        : this.details;

    return {
      code: this.code,
      name: this.name,
      message: this.message,
      details,
    };
  }
}

export class InternalServerError extends BaseError {
  constructor(details: unknown) {
    super(
      HttpStatusCode.InternalServerError,
      "Internal Server Error",
      "Operation cannot be completed due to a problem",
      details
    );
  }
}

export class NotAuthenticated extends BaseError {
  constructor(details: unknown) {
    super(
      HttpStatusCode.Unauthorized,
      "Not Authenticated",
      "The requested resource was not authenticated",
      details
    );
  }
}

export class NotAuthorized extends BaseError {
  constructor(details: unknown) {
    super(
      HttpStatusCode.Forbidden,
      "Unauthorized",
      "You do not have permission to perform this action",
      details
    );
  }
}
