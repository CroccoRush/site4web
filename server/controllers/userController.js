const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn : '24h' }
    )
}

class UserController{
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({ where : { email } })
        if (candidate) {
            return next(ApiError.badRequest('пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password : hashPassword, role : "USER"})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token, userId: user.id , role: user.role})
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({ where : { email } })
            if (!user) {
                return next(ApiError.internal('Пользователь с таким именем не найден'))
            }
            let comparePassword = bcrypt.compareSync(String(password), user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({ token, userId: user.id, role: user.role})
        } catch (e) {
            return next(ApiError.badRequest("Неверные данные"))
        }

    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({ token })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {email} = req.body
            await User.destroy({ where : { email } })
            return res.json({ result: "ok" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeRole(req, res, next) {
        try {
            const {email, role} = req.body
            await User.update({ role }, { where : { email } })
            return res.json({ result: "ok" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()