const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 255
    },
    recovery_question1: {
        type: String,
        max: 255
    },
    answer1: {
        type: String,
        max: 255
    },
    recovery_question2: {
        type: String,
        max: 255
    },
    answer2: {
        type: String,
        max: 255
    },
    recovery_question3: {
        type: String,
        max: 255
    },
    answer3: {
        type: String,
        max: 255
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User