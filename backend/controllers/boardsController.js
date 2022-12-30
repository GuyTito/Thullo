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
  const duplicate = await Board.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate board title' })
  }

  // process image
  let imgPath = ''
  let imgName = ''
  if (req.files) {
    const userFile = req.files.userFile
    imgName = `${title.replaceAll(' ', '_')}_${Date.now()}_boardCover${path.extname(userFile.name).toLowerCase()}`
    imgPath = path.join(__dirname, '..', 'uploads', 'boardCovers', imgName)
    userFile.mv(imgPath)
  }

  // Create and store the new board 
  const board = await Board.create({
    userId, title, privacy, 
    coverImgUrl: imgName && `/uploads/boardCovers/${imgName}`
  })

  board.coverImgUrl = board.coverImgUrl && `${process.env.APP_URL}${board.coverImgUrl}`
  

  if (board) { // Created 
    return res.status(201).json(board)
  } else {
    return res.status(400).json({ message: 'Invalid board data received' })
  }

})


// @desc get a board with id
// @route get /boards/:id
// @access Private
const getBoard = asyncHandler(async (req, res) => {
  const id = req.params.id
  const foundBoard = await Board.findById(id).exec()
  if (!foundBoard) {
    return res.status(401).json({ message: `Board with id ${id} not found.` })
  }
  res.status(200).json({ foundBoard })
})


module.exports = { createNewBoard, getAllBoards, getBoard }