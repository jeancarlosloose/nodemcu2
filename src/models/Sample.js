const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sample = new Schema(
    {
        deviceName : String,
        temperature : Number,
        gas : Number,
        status: String,
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Sample',Sample);