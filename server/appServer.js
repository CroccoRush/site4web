const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const appServer = express()
appServer.use(cors())
appServer.use(express.json())
appServer.use(express.static(path.resolve(__dirname, 'static')))
appServer.use(fileUpload({}))
appServer.use('/api', router)
appServer.use(errorHandler)


module.exports = appServer