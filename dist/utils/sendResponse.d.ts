export declare class CustomApiResponse {
    statusCode: number;
    data: any;
    constructor(statusCode: number, data: any);
    sendResponse(res: any): void;
}
