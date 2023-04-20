const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {userExistsCheckValidation, registerValidation, loginValidation, passwordResetRequestValidation, recoveryAnswerValidation, resetPasswordValidation} = require('../validation')
const jwt = require('jsonwebtoken')

const existingUserCheck = async (req, res) => {
    try{
        const {username} = req.body

        const {error} = userExistsCheckValidation(req.body)
        if(error) return res.status(401).json(error.details[0].message)

        const userExists = await User.findOne({username: username})
        if(userExists) return res.status(403).json({message: 'Username has already been taken'})

        return res.status(200).json({message: "Available!"})    
    } catch (error) {
        res.status(401).json({ message: error.message })  
    }
}

const register =  async (req, res) => {
    const {username, password, recovery_question1, answer1, recovery_question2, answer2, recovery_question3, answer3} = req.body

    const {error} = registerValidation(req.body)
    if(error) return res.status(401).json(error.details[0].message)
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userExists = await User.findOne({username: username})
    if(userExists) return res.status(403).json({message: 'Username has already been taken'})

    const user = new User({
        username: username,
        password: hashedPassword,
        recovery_question1: recovery_question1,
        answer1: answer1,
        recovery_question2: recovery_question2,
        answer2: answer2,
        recovery_question3: recovery_question3,
        answer3: answer3
    })

    try {
        const savedUser = await user.save()
        res.status(201).json({message: 'Registration successful!', data: savedUser._id})
    } catch (error) {
        res.status(401).json({ message: error.message })  
    }
}

const login = async (req, res) => {
    try{
        const {username, pwd} = req.body

        const {error} = loginValidation(req.body)
        if(error) return res.status(403).json({message: error.details[0].message})

        const user = await User.findOne({username : username})
        if(!user) return res.status(401).json({message: 'Invalid credentials!'})

        const validPass = await bcrypt.compare(pwd, user.password)
        if(!validPass) return res.status(403).json({message: "Invalid credentials!"})

        const {password, ...others} = user._doc

        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        res.header('auth-token', token).json({...others, token})
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

const passwordResetRequest = async (req, res) => {
    try {
        const {username} = req.body
        const {error} = passwordResetRequestValidation(req.body)
        if(error) return res.status(403).json({message: error.details[0].message})

        const user = await User.findOne({username: username})
        if(!user) return res.status(401).json({message: 'Username not found!'})

        const {password, ...others} = user._doc
        return res.status(200).json({message: others})
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

const recoveryAnswer = async (req, res) => {
    try {
        const {username, recovery_question, answer} = req.body
        const {error} = recoveryAnswerValidation(req.body)
        if(error) return res.status(403).json({message: error.details[0].message})
        const user = await User.findOne({username : username})
        
        if(
            ((recovery_question == user.recovery_question1) && (answer == user.answer1)) ||
            ((recovery_question == user.recovery_question2) && (answer == user.answer2)) || 
            ((recovery_question == user.recovery_question3) && (answer == user.answer3))
          )return res.status(200).json({message: "Correct!"})
        return res.status(401).json({message: "Recovery question and/or answer incorrect!"})
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

const resetPassword = async(req, res) => {
    try {
        const {username, password} = req.body
        const {error} = resetPasswordValidation(req.body)
        if(error) return res.status(401).json({message: error.details[0].message})
        const user = await User.findOne({username : username})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        await User.findOneAndUpdate(user._id, {password: hashedPassword})
        
        return res.status(200).json({message: "Password Changed successfully"})    
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

module.exports = {existingUserCheck, register, login, resetPassword, recoveryAnswer, passwordResetRequest}