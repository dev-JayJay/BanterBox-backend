export const responseMessage = (response, message = '', responseData = null, statusCode ) => {
    response.status(statusCode).json({
        success: statusCode >= 400 || statusCode >= 500 ? false : true,
        message,
        responseData
    });
}
