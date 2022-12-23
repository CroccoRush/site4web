const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/oauth', userController.oauth)
// router.post('/access_token', userController.access_token)
router.get('/auth', authMiddleware, userController.check)
router.delete('/delete', userController.delete)
router.put('/role', userController.changeRole)

module.exports = router