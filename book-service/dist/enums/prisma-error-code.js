"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaErrorCode = void 0;
var PrismaErrorCode;
(function (PrismaErrorCode) {
    PrismaErrorCode["UniqueConstraintViolation"] = "P2002";
    PrismaErrorCode["ForeignKeyConstraintViolation"] = "P2003";
    PrismaErrorCode["InvalidFieldValue"] = "P2005";
    PrismaErrorCode["RecordNotFound"] = "P2025";
    PrismaErrorCode["ConnectionError"] = "P1001";
    PrismaErrorCode["UnknownError"] = "UNKNOWN_ERROR";
})(PrismaErrorCode || (exports.PrismaErrorCode = PrismaErrorCode = {}));
