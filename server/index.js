require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const httpServer = require("./soketIo");

const PORT = process.env.PORT
const IO_PORT = process.env.IO_PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
//app.use('/io', ioRouter)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`it Done on port ${PORT}`))
        httpServer.listen(IO_PORT, ()=> console.log(`it Done on port ${IO_PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

//TODO сделать сохранение token не в локальное хранилище, а в cookie
