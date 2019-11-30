const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name : String,
        login: String,
        password: String,
        devices: Array
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('User', User);