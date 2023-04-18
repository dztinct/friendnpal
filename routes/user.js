const router = require('express').Router()
const {register, login, resetPassword, passwordResetRequest, recoveryAnswer} = require('../controllers/AuthController')

router.post('/register', register)
router.post('/login', login)
router.post('/password-reset-request', passwordResetRequest)
router.post('/recovery-answer', recoveryAnswer)
router.post('/reset-password', resetPassword)

module.exports = router