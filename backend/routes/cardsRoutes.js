const express = require('express')
const fileUpload = require("express-fileupload");
const router = express.Router()
const cardsController = require('../controllers/cardsController')
const verifyJWT = require("../middleware/verifyJWT");
const fileExtLimiter = require('./../middleware/fileExtLimiter');
const fileSizeLimiter = require('./../middleware/fileSizeLimiter')


router.use(verifyJWT)

router.route('/')
  .post(fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter(1), // 1MB
    cardsController.createCard
  )
  .patch(cardsController.updateCard)
  .delete(cardsController.deleteCard)
router.route('/:boardId')
  .get(cardsController.getCardsByBoardId)



module.exports = router
