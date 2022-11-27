const express = require('express')
const router = express.Router()
const boardsController = require('../controllers/boardsController')
const verifyJWT = require("../middleware/verifyJWT");


router.use(verifyJWT)

router.route('/')
  .get(boardsController.getAllBoards)
  .post(boardsController.createNewBoard)
  // .patch(boardsController.updateBoard)
  // .delete(boardsController.deleteBoard)

module.exports = router
