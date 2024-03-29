const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) return res.status(401).json({message: "Invalid Token!"})
            req.user = user
            next()
        })
    }else{
        return res.status(401).json({message: "Unauthenticated User!"})
    }

}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(401).json({message: 'You are not authorized!'})
        }
    })
}

const verifyTokenAndisAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(401).json({message: 'You are not authorized!'})
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndisAdmin}