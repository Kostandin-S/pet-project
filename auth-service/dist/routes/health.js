"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_code_1 = require("../enums/http-status-code");
const router = (0, express_1.Router)();
router.route("/health").get((_req, res) => {
    res.status(http_status_code_1.HttpStatusCode.OK).json({
        service: "Auth",
        status: http_status_code_1.HttpStatusCode.OK,
    });
});
exports.default = router;
