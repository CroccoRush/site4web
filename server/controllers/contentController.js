const {Content} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class ContentController {
    async create(req, res, next) {
        try {
            const {typeId} = req.body
            const {img} = req.files
            let name = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', name))
            const content = await Content.create({ name, typeId })
            return res.json(content)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const {id} = req.query
            const content = await Content.findOne({ where : { id } })
            return res.json(content)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCount(req, res, next) {
        try {
            const {typeId} = req.query
            const count = await Content.count({ where : { typeId } })
            return res.json(count)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.query
            await Content.destroy({where : { id } })
            return res.json(`Content ${id} successfully deleted`)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ContentController()