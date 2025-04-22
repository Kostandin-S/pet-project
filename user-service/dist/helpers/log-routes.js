"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const logRoutes = (routes) => {
    console.log("\n=== User Service Routes ===");
    routes.forEach((route) => {
        const method = route?.route?.stack[0].method.toUpperCase();
        const path = route?.route?.path;
        if (path && method) {
            logger_1.default.info(`${method} - ${path}`);
        }
    });
};
exports.logRoutes = logRoutes;
