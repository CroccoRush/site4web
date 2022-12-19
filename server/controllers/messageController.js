const {Message} = require('../models/models')
const ApiError = require('../error/ApiError')


class MessageController{
    async create(req, res, next) {
        try {
            const {text, chatId, userId, senderName} = req.body
            const message = await Message.create({text, chatId, userId, senderName})
            return res.json(message)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {chatId} = req.query
            const message = await Message.findAndCountAll({ where: { chatId } })
            return res.json(message)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.query;
            const message = await Message.findOne({ where: { id } });
            return res.json(message);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.query;
            await Message.destroy({ where: { id } })
            return res.json(`Message ${id} successfully deleted`)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new MessageController()