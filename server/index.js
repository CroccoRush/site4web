require('dotenv').config()
const sequelize = require('./db')
const ioServer = require("./soketIo");
const appServer = require("./appServer");

const PORT = process.env.PORT
const IO_PORT = process.env.IO_PORT

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        appServer.listen(PORT, ()=> console.log(`it Done on port ${PORT}`))
        ioServer.listen(IO_PORT, ()=> console.log(`it Done on port ${IO_PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


//TODO сделать сохранение token не в локальное хранилище, а в cookie

