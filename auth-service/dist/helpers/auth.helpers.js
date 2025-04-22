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
exports.checkIfUserExists = exports.prepareUserData = exports.checkIfPasswordsMatch = exports.hashPassword = exports.checkIfEmailAlreadyExists = exports.checkIfUserExistsByEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = __importDefault(require("../constants/errors"));
const userDal = __importStar(require("../repository/users.dal"));
const errors_2 = require("../utils/errors");
const checkIfUserExistsByEmail = async (email) => {
    const user = await userDal.findUniqueUser({ email });
    if (!user) {
        throw new errors_2.NotAuthenticated(errors_1.default.INVALID_CREDENTIALS);
    }
    return user;
};
exports.checkIfUserExistsByEmail = checkIfUserExistsByEmail;
const checkIfEmailAlreadyExists = async (email) => {
    const emailExists = await userDal.findUniqueUser({
        email: email.toLowerCase(),
    });
    if (emailExists) {
        throw new errors_2.UnprocessableEntity(errors_1.default.DUPLICATE_EMAIL);
    }
};
exports.checkIfEmailAlreadyExists = checkIfEmailAlreadyExists;
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const checkIfPasswordsMatch = async (userPassword, providedPassword) => {
    const passwordsMatch = await bcryptjs_1.default.compare(providedPassword, userPassword);
    if (!passwordsMatch) {
        throw new errors_2.NotAuthenticated(errors_1.default.INVALID_CREDENTIALS);
    }
};
exports.checkIfPasswordsMatch = checkIfPasswordsMatch;
const prepareUserData = (user, profile) => {
    const { id, email, isAdmin } = user;
    const { firstName, lastName } = profile;
    return {
        id,
        firstName,
        lastName,
        email,
        isAdmin,
        nickname: profile?.nickname,
        bio: profile?.bio,
    };
};
exports.prepareUserData = prepareUserData;
const checkIfUserExists = async (id) => {
    const user = await userDal.findUniqueUser({ id });
    if (!user) {
        throw new errors_2.NotAuthenticated(errors_1.default.INVALID_SESSION);
    }
    return user;
};
exports.checkIfUserExists = checkIfUserExists;
