"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodErrors = void 0;
const formatZodErrors = (errors) => errors.map((error) => {
    if (error.message === "Required") {
        const pathString = error.path.join(".");
        return `${pathString} is required`;
    }
    return error.message;
});
exports.formatZodErrors = formatZodErrors;
