"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const service = __importStar(require("./auth.services"));
const http_status_code_1 = require("./enums/http-status-code");
const registerUser = async (req, res, next) => {
    try {
        await service.registerUser(req.body);
        res.sendStatus(http_status_code_1.HttpStatusCode.Created);
    }
    catch (e) {
        next(e);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const user = await service.loginUser(req.body);
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;
        console.log(req.session);
        res.sendStatus(http_status_code_1.HttpStatusCode.OK);
    }
    catch (e) {
        next(e);
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res, next) => {
    try {
        await service.logoutUser(req);
        res.clearCookie("connect.sid");
        res.sendStatus(http_status_code_1.HttpStatusCode.OK);
    }
    catch (e) {
        next(e);
    }
};
exports.logoutUser = logoutUser;
const validateSession = async (req, res, next) => {
    try {
        const user = await service.validateSession(req);
        res
            .status(http_status_code_1.HttpStatusCode.OK)
            .send({ userId: user.id, isAdmin: user.isAdmin });
    }
    catch (e) {
        next(e);
    }
};
exports.validateSession = validateSession;
