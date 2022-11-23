const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/User')



// @desc Create a new User
// @route POSt /users
// @access Public
const createNewUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body

  // Confirm data
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate username
  const duplicateEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()
  if (duplicateEmail) return res.status(409).json({ message: 'This email is already taken' })

  const duplicateFullname = await User.findOne({ fullname }).collation({ locale: 'en', strength: 2 }).lean().exec()
  if (duplicateFullname) return res.status(409).json({ message: 'This full name is already taken' })

  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds

  const userObject = { fullname, email, "password": hashedPwd }

  // Create and store new user 
  const user = await User.create(userObject)

  if (user) { //created 
    res.status(201).json({ message: `New user ${fullname} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }

})


module.exports = { createNewUser }