const express = require('express')
const fileUpload = require("express-fileupload");
const router = express.Router()
const boardsController = require('../controllers/boardsController')
const verifyJWT = require("../middleware/verifyJWT");
const fileExtLimiter = require('./../middleware/fileExtLimiter');
const fileSizeLimiter = require('./../middleware/fileSizeLimiter')


router.use(verifyJWT)

router.route('/')
  .get(boardsController.getBoards)
  .post(fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter(1), // 1MB
    boardsController.createNewBoard
  )
  .patch(boardsController.updateBoard)
  // .delete(boardsController.deleteBoard)
router.route('/:id')
  .get(boardsController.getBoard)


module.exports = router
