export const sendResponse = (data, statusCode) => {

    const response  = {
        statusCode,
        data,
    };

    res.status(statusCode).json(response);
}