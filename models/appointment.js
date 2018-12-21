const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AppointmentSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    name: String,
    phone: String,
    email: String,
    date: Date,
});

const Appointment = mongoose.model('Appointment', AppointmentSchema)

function newAppointment(info, callback) {
    let appointment = new Appointment(info)
    appointment.save(callback)
}

function listAppointments(callback) {
    Appointment.find(
        {},
        null,
        {sort: {date: 'asc'}},
        callback,
    )
}

module.exports = {
    newAppointment,
    listAppointments,
}