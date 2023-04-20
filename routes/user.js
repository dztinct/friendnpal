const router = require('express').Router()
const {register, login, resetPassword, passwordResetRequest, recoveryAnswer, recoveryQuestion} = require('../controllers/AuthController')

router.post('/register', register)
router.post('/recovery-question', recoveryQuestion)
router.post('/login', login)
router.post('/password-reset-request', passwordResetRequest)
router.post('/recovery-answer', recoveryAnswer)
router.post('/reset-password', resetPassword)

module.exports = router