"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomApiResponse = void 0;
class CustomApiResponse {
    constructor(statusCode, data) {
        this.statusCode = statusCode;
        this.data = data;
    }
    ;
    sendResponse(res) {
        res.status(this.statusCode).json({
            statusCode: this.statusCode,
            data: this.data
        });
    }
}
exports.CustomApiResponse = CustomApiResponse;
//# sourceMappingURL=sendResponse.js.map