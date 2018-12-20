'use strict';

const stringify = require('json-stringify-safe');
const util      = require('util');
const logger  = require('./logger');

const fieldsToLog = ['body', 'headers', 'hostname', 'ip', 'ips', 'method', 'originalUrl', 'params', 'query', 'transaction_id'];

const errors = {
    40000: 'Bad Request',
    40001: 'Missing Request Headers',
    40002: 'Bad Template Parameters',
    40003: 'Bad Query Parameters',
    40100: 'Unauthorized',
    40300: 'Forbidden',
    40301: 'Invalid Authentication Token',
    40302: 'Request Unauthorized',
    40400: 'Not Found',
    40401: 'Resource Not Found',
    40500: 'Method Not Allowed',
    42200: 'Unprocessable Entity',
    50000: 'Internal Error',
    50001: 'Failed to Get Resource',
    50002: 'Failed to Write to Database',
    50003: 'Failed to Encrypt Resource',
    50004: 'Failed to Decrypt Resource',
};

function replaceErrors(value) {
    if (value instanceof Error) {
        let error = {};
        Object.getOwnPropertyNames(value).forEach(key => {
            error[key] = value[key];
        });
        return error;
    }
    return value;
}

function mergeResponse(req, info, message) {
    let reqCopy = {};
    let field;
    for (field in req) {
        if (fieldsToLog.indexOf(field) !== -1) {
            reqCopy[field] = req[field];
        }
    }
    let logMessage = {};
    logMessage.request = JSON.parse(stringify(reqCopy));
    logMessage.response = replaceErrors(info);
    logMessage.message = message;
    return logMessage;
}

function errorResponse(req, res, type, error) {
    let responseJson = {};
    let status = Math.trunc(type/100);  // The 3 most significant digits of the type are the status
    responseJson.status = status;
    // If a title was not defined for that error type use the default title for that status code.
    responseJson.title = errors[type] || errors[status * 100];
    responseJson.detail = error.message;
    res.locals.responseJson = Object.assign({}, responseJson);
    res.locals.responseJson.error = replaceErrors(error);
    if (type === 50000) {
        responseJson.detail = 'Internal Server Error';
    }
    res.contentType('application/problem+json');
    res.status(status).send(JSON.stringify(responseJson));
}

function successResponse(res, status, data) {
    let responseJson = {};
    responseJson.status = status;
    responseJson.data = data;
    res.locals.responseJson = Object.assign({}, responseJson);
    res.status(status).send(data);
}

function logTransaction(req, res, duration) {
    let status = res.statusCode;
    let responseJson = res.locals.responseJson;
    let message = util.format('%s at: %s - status: %s. Took: %s ms.', req.method, req.originalUrl, status, duration);
    if (status >= 400) {
        message = util.format('%s\nError: %s', message, responseJson.detail);
    }
    let logMessage = mergeResponse(req, responseJson, message);
    logMessage.request.uid = res.locals.uid;
    if (status >= 500 && status < 600) {
        logger.error(logMessage);
    } else {
        logger.info(logMessage);
    }
}

module.exports = {
    errorResponse,
    logTransaction,
    mergeResponse,
    successResponse,
};