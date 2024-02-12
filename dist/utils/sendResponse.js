"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data, statusCode) => {
    const response = {
        statusCode,
        data,
    };
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=sendResponse.js.map