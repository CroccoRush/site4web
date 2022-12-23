const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Octokit} = require("octokit");

const generateJwt = (id, username, role) => {
    return jwt.sign(
        { id, username, role },
        process.env.SECRET_KEY,
        { expiresIn : '24h' }
    )
}

class UserController{
    async registration(req, res, next) {
        const {username, password} = req.body
        if (!username || !password) {
            return next(ApiError.badRequest('Некорректное имя пользователя или пароль'))
        }
        const candidate = await User.findOne({ where : { username } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ username, password : hashPassword, role : "USER"})
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({ token, userId: user.id , role: user.role})
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({ where : { username } })
            if (!user) {
                return next(ApiError.internal('Пользователь с таким именем не найден'))
            } else if (!user.password){
                return next(ApiError.internal('У пользователя с таким именем в качестве способа входа выбран Github'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.username, user.role)
            return res.json({ token, userId: user.id, role: user.role})
        } catch (e) {
            return next(ApiError.badRequest("Неверные данные"))
        }
    }

    async oauth(req, res, next) {
        try{
            const { OAuthApp, createNodeMiddleware } = require("@octokit/oauth-app");
            const {code} = req.body
            const clientId = "4bc6dde507d800eabd20";
            const clientSecret = "6b2f67198d131a197777c822ba52ff00647aab3a";
            const oauth_app = new OAuthApp({
                clientType: "oauth-app",
                clientId: clientId,
                clientSecret: clientSecret,
                defaultScopes: [ 'user' ]
            });
            const octokot = await oauth_app.getUserOctokit({ code: code });
            const data = await octokot.request("GET /user", {});
            const username = data.data.login;
            if (username)
                var user = await User.findOne({ where : { username } })
            else return next(ApiError.internal('Не удалось получить данные о пользователе'))
            if (!user) {
                const user = await User.create({ username, password : null, role : "USER"})
            } else if (user.password)
                return next(ApiError.internal('У пользователя с таким именем в качестве способа входа выбран пароль'))
            var user = await User.findOne({ where : { username } })
            const token = generateJwt(user.id, user.username, user.role)
            return res.json({ token, userId: user.id, role: user.role})
        } catch (e) {
            return next(ApiError.badRequest("Неверные данные"))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.username, req.user.role)
            return res.json({ token })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {username} = req.body
            await User.destroy({ where : { username } })
            return res.json({ result: "ok" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeRole(req, res, next) {
        try {
            const {username, role} = req.body
            await User.update({ role }, { where : { username } })
            return res.json({ result: "ok" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()