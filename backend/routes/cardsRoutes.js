const express = require('express')
const fileUpload = require("express-fileupload");
const router = express.Router()
const cardsController = require('../controllers/cardsController')
const verifyJWT = require("../middleware/verifyJWT");
const fileExtLimiter = require('./../middleware/fileExtLimiter');
const fileSizeLimiter = require('./../middleware/fileSizeLimiter')


router.use(verifyJWT)

console.log('was here some', )

router.route('/')
  .post(fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter(1), // 1MB
    cardsController.createCard
  )
router.route('/:listId')
  .get(cardsController.getCards)



module.exports = router
