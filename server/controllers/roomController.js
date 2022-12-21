const {Room, Chat, Content} = require('../models/models');
const { Op, QueryTypes } = require("sequelize");
const sequelize = require('../db')
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class RoomController{
    async create(req, res, next) {
        try {
            const {name, description, userId, typeId} = req.body
            const {file} = req.files


            let fileName = uuid.v4() + ".jpg"
            await file.mv(path.resolve(__dirname, '..', 'static', fileName))
            const content = await Content.create({
                typeId,
                name: fileName,
            })
            const chat = await Chat.create()
            const room = await Room.create({ name, description, userId, contentId: content.id, chatId: chat.id })

            return res.json(room)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {name, typeId, page, limit} = req.query
            page = page || 1
            limit = limit || 12
            let offset = limit * (page - 1)
            if (typeId && name) {
                const room = await sequelize.query(
                    `SELECT * FROM rooms WHERE \"name\" LIKE '%${name}%' AND \"contentId\" IN (SELECT id FROM contents WHERE \"typeId\" = ${typeId})`,
                    { type: QueryTypes.SELECT }
                );
                return res.json(room)
            } else if (typeId) {
                const room = await sequelize.query(
                    `SELECT * FROM rooms WHERE \"contentId\" IN (SELECT id FROM contents WHERE \"typeId\" = ${typeId})`,
                    { type: QueryTypes.SELECT }
                );
                return res.json(room)
            } else if (name) {
                const room = await Room.findAndCountAll({
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    limit,
                    offset
                })
                return res.json(room.rows)
            }
            const room = await Room.findAndCountAll({ limit, offset })
            return res.json(room.rows)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getCount(req, res, next) {
        try {
            let {name, typeId} = req.body
            if (typeId && name) {
                const room = await sequelize.query(
                    `SELECT COUNT(*) FROM rooms WHERE \"name\" LIKE '%${name}%' AND \"contentId\" IN (SELECT id FROM contents WHERE \"typeId\" = ${typeId})`,
                    { type: QueryTypes.SELECT }
                );
                return res.json(Number(room[0]["count"]))
            } else if (typeId) {
                const room = await sequelize.query(
                    `SELECT COUNT(*) FROM rooms WHERE \"contentId\" IN (SELECT id FROM contents WHERE \"typeId\" = ${typeId})`,
                    { type: QueryTypes.SELECT }
                );
                return res.json(Number(room[0]["count"]))
            } else if (name) {
                const room = await Room.count({
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                })
                return res.json(room)
            }
            const room = await Room.count()
            return res.json(room)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const room = await Room.findOne({ where : { id } })
            return res.json(room)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const room = await Room.findOne({ where : { id } })
            //console.log(room.chatId)
            await Chat.destroy({ where : { id : room.chatId }, force: true })
            await Content.destroy({ where : { id : room.contentId }, force: true })
            await Room.destroy({ where : { id }, force: true })
            return res.json({ result: "ok" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RoomController()