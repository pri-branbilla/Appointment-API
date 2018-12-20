const dateModel = require('../models/dates')
const middleware = require('../libs/firebaseMiddleware')
const moment = require('moment')

function getNewDates(startDate, finalDate, step){
    let dates = []
    let iterDate = startDate
    while (moment(iterDate) <= moment(finalDate)) {
        dates.push({
            schDate: iterDate
        })
        iterDate = moment(iterDate).add(step, 'minutes')
    }
    return dates
}


function postNewDate(req, res, callback) {
    middleware.verifyAuth(req, res, (response) => {
        const datesArray = getNewDates(
            req.body.startDate,
            req.body.finalDate,
            req.body.step,
        )
        dateModel.newDate(datesArray, (err, data) => {
            if (err) {
                console.log(err)
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