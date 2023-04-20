const Joi  = require('joi')


const userExistsCheckValidation = (data) => {
    const schema = Joi.object({
        username : Joi.string().required(),
    })
    return schema.validate(data)
}

const registerValidation = (data) => {
    const schema = Joi.object({
        username : Joi.string().required(),
        password: Joi.string().min(8).max(255).required(),
        recovery_question1: Joi.string().max(255).required(),
        answer1: Joi.string().max(255).required(),
        recovery_question2: Joi.string().max(255).required(),
        answer2: Joi.string().max(255).required(),
        recovery_question3: Joi.string().max(255).required(),
        answer3: Joi.string().max(255).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(4),
        pwd: Joi.string().min(8).max(255).required()
    })
    return schema.validate(data)
}

const passwordResetRequestValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(4),
    })
    return schema.validate(data)
}

const recoveryAnswerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(4),
        recovery_question: Joi.string().max(255).required(),
        answer: Joi.string().max(255).required()
    })
    return schema.validate(data)
}

const resetPasswordValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(4),
        password: Joi.string().min(8).max(255).required()

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