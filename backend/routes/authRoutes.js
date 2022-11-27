const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()


router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

router.route('/refresh')
  .get(authController.refresh)

router.route('/signout')
  .post(authController.signout)



module.exports = router;
