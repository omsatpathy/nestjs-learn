export const sendResponse = (res, data, statusCode) => {

    const response  = {
        statusCode,
        data,
    };

    res.status(statusCode).json(response);
}