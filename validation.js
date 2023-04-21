const Joi  = require('joi')


const userExistsCheckValidation = (data) => {
    const schema = Joi.object({
        username : Joi.required(),
    })
    return schema.validate(data)
}

const registerValidation = (data) => {
    const schema = Joi.object({
        username : Joi.required(),
        password: Joi.required(),
        recovery_question1: Joi.required(),
        answer1: Joi.required(),
        recovery_question2: Joi.required(),
        answer2: Joi.required(),
        recovery_question3: Joi.required(),
        answer3: Joi.required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.required(),
        pwd: Joi.required()
    })
    return schema.validate(data)
}

const passwordResetRequestValidation = (data) => {
    const schema = Joi.object({
        username: Joi.required(),
    })
    return schema.validate(data)
}

const recoveryAnswerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.required(),
        recovery_question: Joi.required(),
        answer: Joi.required()
    })
    return schema.validate(data)
}

const resetPasswordValidation = (data) => {
    const schema = Joi.object({
        username: Joi.required(),
        password: Joi.required()

    })
    return schema.validate(data)
}

module.exports = {
    userExistsCheckValidation,
    registerValidation,
    loginValidation,
    passwordResetRequestValidation,
    recoveryAnswerValidation,
    resetPasswordValidation
}