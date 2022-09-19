const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        reuqired: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type:Boolean,
        required: true
    },
    mail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("admin", AdminSchema)