"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparePrismaError = preparePrismaError;
const library_1 = require("@prisma/client/runtime/library");
const http_status_code_1 = require("../enums/http-status-code");
const prisma_error_code_1 = require("../enums/prisma-error-code");
function preparePrismaError(error) {
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        switch (error.code) {
            case prisma_error_code_1.PrismaErrorCode.UniqueConstraintViolation:
                return {
                    httpCode: http_status_code_1.HttpStatusCode.BadRequest,
                    name: "UniqueConstraintViolation",
                    message: `Unique constraint violation: ${error.meta?.target}`,
                    details: error.message,
                };
            case prisma_error_code_1.PrismaErrorCode.ForeignKeyConstraintViolation:
                return {
                    httpCode: http_status_code_1.HttpStatusCode.BadRequest,
                    name: "ForeignKeyViolation",
                    message: `Foreign key constraint violation: ${error.meta?.target}`,
                    details: error.message,
                };
            case prisma_error_code_1.PrismaErrorCode.InvalidFieldValue:
                return {
                    httpCode: http_status_code_1.HttpStatusCode.BadRequest,
                    name: "InvalidFieldValue",
                    message: `Invalid value for field: ${error.meta?.target}`,
                    details: error.message,
                };
            default:
                return {
                    httpCode: http_status_code_1.HttpStatusCode.InternalServerError,
                    name: "PrismaError",
                    message: `A Prisma error occurred: ${error.message}`,
                    details: error.message,
                };
        }
    }
    else if (error instanceof library_1.PrismaClientInitializationError) {
        return {
            httpCode: http_status_code_1.HttpStatusCode.InternalServerError,
            name: "PrismaInitializationError",
            message: "Error initializing Prisma Client: Could not connect to the database.",
            details: error.message,
        };
    }
    else if (error instanceof library_1.PrismaClientRustPanicError) {
        return {
            httpCode: http_status_code_1.HttpStatusCode.InternalServerError,
            name: "PrismaRustPanicError",
            message: "Prisma Client Rust engine encountered a panic.",
            details: error.message,
        };
    }
    else if (error instanceof library_1.PrismaClientUnknownRequestError) {
        return {
            httpCode: http_status_code_1.HttpStatusCode.InternalServerError,
            name: "PrismaUnknownRequestError",
            message: "An unknown error occurred while processing the request with Prisma.",
            details: error.message,
        };
    }
    return {
        httpCode: http_status_code_1.HttpStatusCode.InternalServerError,
        name: "UnknownError",
        message: "An unknown error occurred.",
        details: "",
    };
}
