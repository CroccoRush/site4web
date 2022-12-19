const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController')


router.post('/', roomController.create)
router.get('/', roomController.getAll)
router.get('/count/', roomController.getCount)
router.get('/:id', roomController.getOne)
router.delete('/', roomController.delete)

module.exports = router