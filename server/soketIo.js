const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {createServer} = require("http");
const {Server} = require("socket.io");
const {Chat, Message, User} = require("./models/models");

const chatApi = express()
chatApi.use(cors())
chatApi.use(express.json())
chatApi.use(fileUpload({}))

const ioServer = createServer(chatApi);

const CORS_ORIGIN = process.env.CORS_ORIGIN

const io = new Server(ioServer, {
    cors: {
        origin: CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true
    },
});

const socketIo = (socket) => {
    socket.on("NEW_MESSAGE", async (arg) => {
        const {text, chatId, userId} = arg
        const chat = await Chat.findOne({ where: { id: chatId } })
        const user = await User.findOne({ where: { id: userId } })
        if (chat && user) {
            const message = await Message.create({text, chatId, userId, senderName: user.email});
            socket.broadcast.emit("NEW_MESSAGE", {
                id: message.id,
                text: message.text,
                userId,
                chatId,
                createdAt: message.createdAt,
                senderName: user.email
            });
        }
    })

    socket.on("disconnect", () => {
        console.log(socket.connected);
    });
}

io.on("connection", socketIo);


module.exports = ioServer