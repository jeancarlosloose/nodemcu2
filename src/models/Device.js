const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema(
    {
        name: String,
        alias: String,
    },
    {
        timestamps : true
    }
);


module.exports = mongoose.model('Device', Device)
