"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalErrorHandlers = void 0;
const axios_1 = require("axios");
const errors_1 = require("../utils/errors");
const internalErrorHandlers = (error) => {
    const statusCode = error?.status || axios_1.HttpStatusCode.InternalServerError;
    const details = error?.data?.details || "Something went wrong";
    switch (statusCode) {
        case axios_1.HttpStatusCode.BadRequest:
            return new errors_1.BadRequest(details);
        case axios_1.HttpStatusCode.Unauthorized:
            return new errors_1.NotAuthenticated(details);
        case axios_1.HttpStatusCode.Forbidden:
            return new errors_1.NotAuthorized(details);
        case axios_1.HttpStatusCode.NotFound:
            return new errors_1.NotFoundError(details);
        case axios_1.HttpStatusCode.Conflict:
            return new errors_1.Conflict(details);
        case axios_1.HttpStatusCode.UnprocessableEntity:
            return new errors_1.UnprocessableEntity(details);
        default:
            return new errors_1.InternalServerError(details);
    }
};
exports.internalErrorHandlers = internalErrorHandlers;
