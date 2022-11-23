const Board = require('../models/Board')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')


// @desc Create new board
// @route POST /boards
// @access Private
const createNewBoard = asyncHandler(async (req, res) => {
  const { user, title, description } = req.body

  // Confirm data
  if (!user || !title || !description) {
    return res.status(400).json({ message: 'A user, title and description are required' })
  }

  // Check for duplicate title
  const duplicate = await Board.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate board title' })
  }

  // Create and store the new user 
  const board = await Board.create({ user, title, description })

  if (board) { // Created 
    return res.status(201).json({ message: 'New board created' })
  } else {
    return res.status(400).json({ message: 'Invalid board data received' })
  }

})


module.exports = { createNewBoard }