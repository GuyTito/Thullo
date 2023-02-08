const express = require('express')
const router = express.Router()
const listsController = require('../controllers/listsController')
const verifyJWT = require("../middleware/verifyJWT");


router.use(verifyJWT)


router.route('/')
  .post(listsController.createList)
  .delete(listsController.deleteList)
router.route('/:boardId')
  .get(listsController.getLists)


module.exports = router
