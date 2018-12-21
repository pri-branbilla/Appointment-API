const dateModel = require('../models/dates')
const middleware = require('../libs/firebaseMiddleware')
const utils = require('../libs/util')

function postNewDate(req, res, callback) {
    middleware.verifyAuth(req, res, (response) => {
        if (req.body.startDate === 'Invalid date') {
            error = {
                type: 42200,
                message: "Invalid start date"
            }
            return callback(error)
        }
        const datesArray = utils.getNewDates(
            req.body.startDate,
            req.body.finalDate,
            req.body.startHour,
            req.body.finishHour,
            req.body.daysStep,
            req.body.step,
        )
        console.log(req.body)
        dateModel.newDate(datesArray, (err, data) => {
            if (err) {
                err.type = 50002;
                callback(err);
            } else {
                callback(err, data);
            }
        })
    })
}

function getAvailableDates(callback) {
    dateModel.listAvailableDates((err, data) => {
        if (err) {
            err.type = 50002;
            callback(err);
        } else {
            callback(err, data);
        }
    })
}

function updateDate(scheduledDate, callback) {
    dateModel.scheduleDate(scheduledDate, (err, data) => {
        if (err) {
            err.type = 50002;
            callback(err);
        } else {
            callback(err, data);
        }
    })
}

module.exports = {
    postNewDate,
    getAvailableDates,
    updateDate
}