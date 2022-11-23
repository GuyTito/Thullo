const User = require('../models/User')
// const Note = require('../models/Note')
const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcrypt');

// @desc Get all Users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select('-password').lean()

  // If no users 
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }

  res.json(users)
})


module.exports = { getAllUsers }