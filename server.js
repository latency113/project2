//step 1 import
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
// const authRouter = require('./routers/auth')
// const categoryRouter = require('./routers/categary')

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// app.use('/api',authRouter)
// app.use('/api',categoryRouter)
readdirSync('./routes').map((item)=> 
    app.use('/api',require('./routes/'+item)))

//step 2 Start Server
app.listen(5000,
    ()=> console.log('Server is running on port 5000'))