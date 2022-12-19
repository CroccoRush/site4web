const {Chat} = require("../models/models")
const ApiError = require('../error/ApiError')

class ChatController{
    async create(req, res, next) {
        try {
            const {roomId} = req.body
            const chat = await Chat.create({ roomId })
            return res.json(chat)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const {id} = req.query
            const chat = await Chat.findOne({ where: { id } })
            return res.json(chat)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = res.query
            await Chat.destroy({where: { id: id } } )
            return res.json(`Chat ${id} successfully deleted`)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ChatController()