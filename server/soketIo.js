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
const httpServer = createServer(chatApi);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
    wsEngine: require("eiows").Server,
});

const soketIo = (socket) => {
    socket.on("NEW_MESSAGE", async (arg) => {
        const {text, chatId, userId} = arg
        const chat = await Chat.findOne({ where: { id: chatId } })
        const user = await User.findOne({ where: { id: userId } })
        if (chat && user) {
            const message = await Message.create({text, chatId, userId, senderName: user.email});
            socket.emit("NEW_MESSAGE", {
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

io.on("connection", soketIo);

module.exports = httpServer