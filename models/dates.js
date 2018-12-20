const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const DatesSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    schDate: Date,
    scheduled: { type: Boolean, default: false },
});

const DateTimeModel = mongoose.model('Dates', DatesSchema)

function newDate(datesArray, callback) {
    DateTimeModel.insertMany(datesArray, callback)
}

function listAvailableDates(callback) {
    DateTimeModel.find(
        { scheduled: false },
        null,
        {sort: {schDate: 'asc'}},
        callback
    )
}

function scheduleDate(date, callback) {
    DateTimeModel.findOneAndUpdate({ schDate: date }, { scheduled: true }, callback)
}

module.exports = {
    newDate,
    listAvailableDates,
    scheduleDate
}