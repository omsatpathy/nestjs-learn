

export class CustomApiResponse {
    constructor(public statusCode: number, public data: any) {};

    sendResponse(res) {
        res.status(this.statusCode).json({
            statusCode: this.statusCode,
            data: this.data
        })
    }
}