const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema(
    {
        deviceName: String,
    },
    {
        timestamps : true
    }
);


module.exports = mongoose.model('Device', Device)
