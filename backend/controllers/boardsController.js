const path = require('path');

const Board = require('../models/Board')
// const User = require('../models/User')
const asyncHandler = require('express-async-handler')


// @desc Get all boards 
// @route GET /boards
// @access Private
const getAllBoards = asyncHandler(async (req, res) => {
  // Get all boards from MongoDB
  const boards = await Board.find().lean()

  // If no boards 
  if (!boards?.length) {
    return res.status(400).json({ message: 'No boards found' })
  }

  res.json(boards)
})

// @desc Create new board
// @route POST /boards
// @access Private
const createNewBoard = asyncHandler(async (req, res) => {
  const { userId, title, privacy } = req.body

  // Confirm data
  if (!userId || !title ) {
    return res.status(400).json({ message: 'A user and title are required' })
  }

  // Check for duplicate title
  // const duplicate = await Board.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  // if (duplicate) {
  //   return res.status(409).json({ message: 'Duplicate board title' })
  // }

  // process image
  let imgPath = ''
  if (req.files) {
    const userFile = req.files.userFile
    imgName = `${title}_${Date.now()}_boardCover${path.extname(userFile.name).toLowerCase()}`
    imgPath = path.join(__dirname, '..', 'uploads', 'boardCovers', imgName)
    userFile.mv(imgPath)
  }
  return res.json({ title, boardCover: imgPath })

  // Create and store the new user 
  // const board = await Board.create({ userId, title, privacy, coverImgUrl })

  // if (board) { // Created 
  //   return res.status(201).json({ message: 'New board created' })
  // } else {
  //   return res.status(400).json({ message: 'Invalid board data received' })
  // }

})


module.exports = { createNewBoard, getAllBoards }