const express = require('express')
const fileUpload = require("express-fileupload");
const router = express.Router()
const boardsController = require('../controllers/boardsController')
const verifyJWT = require("../middleware/verifyJWT");
const fileExtLimiter = require('./../middleware/fileExtLimiter');
const fileSizeLimiter = require('./../middleware/fileSizeLimiter')


router.use(verifyJWT)

router.route('/')
//board
  .get(boardsController.getAllBoards)
  .post(fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter(1), // 1MB
    boardsController.createNewBoard
  )
  .patch(boardsController.updateBoard)
  // .delete(boardsController.deleteBoard)
router.route('/:id')
  .get(boardsController.getBoard)

//list
router.route('/lists')
  .post(boardsController.createList)
router.route('/lists/:boardId')
  .get(boardsController.getLists)

//card
router.route('/lists/cards')
  .post(fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter(1), // 1MB
    boardsController.createCard
  )
router.route('/lists/cards/:listId')
  .get(boardsController.getCards)
module.exports = router
