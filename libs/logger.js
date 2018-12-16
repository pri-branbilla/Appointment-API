'use strict';

const winston = require('winston');

const noticeLogger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false
});
noticeLogger.setLevels(winston.config.syslog.levels);

const infoLogger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false
});
infoLogger.setLevels(winston.config.syslog.levels);

const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false
});
errorLogger.setLevels(winston.config.syslog.levels);

const alertLogger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false
});
alertLogger.setLevels(winston.config.syslog.levels);

function notice(params) {
    noticeLogger.notice(params);
}

function info(params) {
    infoLogger.info(params);
}

function error(params) {
    errorLogger.error(params);
}

function alert(params) {
    alertLogger.alert(params);
}

module.exports = {
    alert,
    error,
    info,
    notice
};