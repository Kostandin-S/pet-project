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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const users_helpers_1 = require("./helpers/users.helpers");
const dal = __importStar(require("./repositories/profile.dal"));
const users_validator_1 = require("./users.validator");
const getUsers = async () => {
    return await dal.getProfiles({});
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    return await (0, users_helpers_1.checkIfUserExistsById)(id);
};
exports.getUserById = getUserById;
const createUser = async (reqBody) => {
    return await dal.createProfile({ ...reqBody });
};
exports.createUser = createUser;
const updateUser = async (id, reqBody) => {
    const user = await (0, users_helpers_1.checkIfUserExistsById)(id);
    (0, users_validator_1.validateUpdateUserRequestBody)(reqBody);
    return await dal.updateProfile({ id: user.id }, {
        firstName: reqBody?.firstName,
        lastName: reqBody?.lastName,
        nickname: reqBody?.nickname,
        bio: reqBody?.bio,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const user = await (0, users_helpers_1.checkIfUserExistsById)(id);
    return await dal.deleteProfile({ id: user.id });
};
exports.deleteUser = deleteUser;
