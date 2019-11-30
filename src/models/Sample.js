const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sample = new Schema(
    {
        
        temperature : Number,
        gas : Number,
        status: String,
        deviceName : String,
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Sample',Sample);
