const Router = require('express')
const router = new Router()
const contentController = require('../controllers/contentController')

router.post('/', contentController.create)
router.get('/', contentController.get)
router.get('/count/', contentController.getCount)
router.delete('/delete/:id', contentController.delete)

module.exports = router