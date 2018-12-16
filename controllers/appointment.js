const appointmentModel = require('../models/appointment')
const middleware = require('../libs/firebaseMiddleware')

function postAppointment(info, callback) {
    appointmentModel.newAppointment(info, (err, data) => {
        if (err) {
            err.type = 50002;
            callback(err);
        } else {
            callback(err, data);
        }
    })
}

function getAppointments(req, res, callback) {
    middleware.verifyAuth(req, res, function (response) {
        console.log(response)
        appointmentModel.listAppointments((err, data) => {
            if (err) {
                err.type = 50002;
                callback(err);
            } else {
                callback(err, data);
            }
        })
    })
}

module.exports = {
    postAppointment,
    getAppointments,
}