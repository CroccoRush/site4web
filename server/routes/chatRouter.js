const Router = require('express')
const router = new Router()
const chatController = require('../controllers/chatController')


router.post('/', chatController.create)
router.get('/', chatController.get)
router.delete('/delete/:id', chatController.delete)

module.exports = router