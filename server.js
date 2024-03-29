const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()

app.use(express.json())

const userRoute = require('./routes/user')
app.use('/api/user', userRoute)

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Database connected...')
}).catch((error) => {
    console.log(error)
})

const port = process.env.PORT

app.listen(port || 6000, () => {
    port ? console.log(`App listening on port ${port}...`) : console.log('App listening on port 6000...')
})