"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = exports.GeminiError = exports.NotAuthorized = exports.NotAuthenticated = exports.PrismaError = exports.InternalServerError = exports.NotFoundError = exports.BadRequest = exports.UnprocessableEntity = exports.BaseError = void 0;
const util_1 = __importDefault(require("util"));
const http_status_code_1 = require("../enums/http-status-code");
class BaseError extends Error {
    constructor(httpCode, name, message, details) {
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
        const details = typeof this.details === "object"
            ? util_1.default.inspect(this.details)
            : this.details;
        return {
            code: this.code,
            name: this.name,
            message: this.message,
            details,
        };
    }
}
exports.BaseError = BaseError;
class UnprocessableEntity extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.UnprocessableEntity, "Unprocessable Entity", "Your request was understood but could not be completed due to semantic errors", details);
    }
}
exports.UnprocessableEntity = UnprocessableEntity;
class BadRequest extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.BadRequest, "Bad Request", "Your request contains invalid or missing data", details);
    }
}
exports.BadRequest = BadRequest;
class NotFoundError extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.NotFound, "Not Found", "The requested resource was not found", details);
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.InternalServerError, "Internal Server Error", "Operation cannot be completed due to a problem", details);
    }
}
exports.InternalServerError = InternalServerError;
class PrismaError extends BaseError {
    constructor(httpCode, name, message, details) {
        super(httpCode, name, message, details);
    }
}
exports.PrismaError = PrismaError;
class NotAuthenticated extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.Unauthorized, "Not Authenticated", "The requested resource was not authenticated", details);
    }
}
exports.NotAuthenticated = NotAuthenticated;
class NotAuthorized extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.Forbidden, "Unauthorized", "You do not have permission to perform this action", details);
    }
}
exports.NotAuthorized = NotAuthorized;
class GeminiError extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.InternalServerError, "Gemini Error", "Operation cannot be completed due to a problem", details);
    }
}
exports.GeminiError = GeminiError;
class Conflict extends BaseError {
    constructor(details) {
        super(http_status_code_1.HttpStatusCode.Conflict, "Conflict", "The request could not be completed due to a conflict with the current state of the resource", details);
    }
}
exports.Conflict = Conflict;
