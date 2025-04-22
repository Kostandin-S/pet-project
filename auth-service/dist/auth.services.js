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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const auth_validator_1 = require("./auth.validator");
const errors_1 = __importDefault(require("./constants/errors"));
const auth_helpers_1 = require("./helpers/auth.helpers");
const userDal = __importStar(require("./repository/users.dal"));
const requests_1 = require("./requests/user-service/requests");
const errors_2 = require("./utils/errors");
const registerUser = async (reqBody) => {
    (0, auth_validator_1.validateRegisterUserRequest)(reqBody);
    const { firstName, lastName, email, password } = reqBody;
    await (0, auth_helpers_1.checkIfEmailAlreadyExists)(email);
    const hashedPassword = await (0, auth_helpers_1.hashPassword)(password);
    const newUserBody = {
        email: email.toLowerCase(),
        password: hashedPassword,
        isAdmin: false,
    };
    const user = await userDal.createUser({ ...newUserBody });
    const newProfileBody = {
        userId: user.id,
        firstName,
        lastName,
        nickname: reqBody?.nickname,
        bio: reqBody?.bio,
    };
    const profile = await (0, requests_1.createProfile)(newProfileBody);
    return (0, auth_helpers_1.prepareUserData)(user, profile);
};
exports.registerUser = registerUser;
const loginUser = async (reqBody) => {
    (0, auth_validator_1.validateUserLoginRequest)(reqBody);
    const userData = await (0, auth_helpers_1.checkIfUserExistsByEmail)(reqBody.email);
    await (0, auth_helpers_1.checkIfPasswordsMatch)(userData.password, reqBody.password);
    return userData;
};
exports.loginUser = loginUser;
const logoutUser = async (req) => new Promise((resolve, reject) => {
    req.session.destroy((error) => {
        if (error)
            return reject(error);
        resolve();
    });
});
exports.logoutUser = logoutUser;
const validateSession = async (req) => {
    if (!req.session || !req.session?.userId) {
        throw new errors_2.NotAuthenticated(errors_1.default.INVALID_SESSION);
    }
    const user = await (0, auth_helpers_1.checkIfUserExists)(req.session.userId);
    if (user.isAdmin !== req.session?.isAdmin) {
        throw new errors_2.NotAuthenticated(errors_1.default.INVALID_SESSION);
    }
    return user;
};
exports.validateSession = validateSession;
