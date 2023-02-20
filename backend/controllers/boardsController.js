const path = require('path');
const Board = require('../models/Board')
const List = require('../models/List')
const asyncHandler = require('express-async-handler')


// @desc Get all boards 
// @route GET /boards
// @access Private
// const getAllBoards = asyncHandler(async (req, res) => {
//   // Get all boards from MongoDB
//   console.log('req.user', req.UserInfo)
//   const boards = await Board.find().lean()

//   // If no boards 
//   if (!boards?.length) {
//     return res.status(400).json({ message: 'No boards found' })
//   }

//   res.json(boards)
// })
const getBoards = asyncHandler(async (req, res) => {
  const {userId} = req.UserInfo
  
  // Get boards with privacy set to false
  const publicBoards = await Board.find({ privacy: false }).lean();

  // Get boards with privacy set to true that match the given userId
  const privateBoards = await Board.find({ privacy: true, userId }).lean();

  // Merge the two arrays of boards
  const boards = publicBoards.concat(privateBoards);

  // Sort the boards by createdAt in ascending order
  const sortedBoards = boards.sort((a, b) => a.createdAt - b.createdAt);

  // If no boards 
  if (!sortedBoards?.length) {
    return res.status(400).json({ message: 'No boards found' })
  }

  res.json(sortedBoards)
})

// @desc Create new board
// @route POST /boards
// @access Private
const createNewBoard = asyncHandler(async (req, res) => {
  const { userId, title, privacy, coverImgUrl } = req.body

  // Confirm data
  if (!userId || !title ) {
    return res.status(400).json({ message: 'A user and title are required' })
  }

  // Check for duplicate title
  const duplicate = await Board.findOne({ title, userId }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate board title' })
  }

  // Create and store the new board 
  const board = await Board.create({
    userId, title, privacy, coverImgUrl
  })


  if (board) { // Created 
    return res.status(201).json(board)
  } else {
    return res.status(400).json({ message: 'Invalid board data received' })
  }

})


// @desc get a board with id
// @route GET /boards/:id
// @access Private
const getBoard = asyncHandler(async (req, res) => {
  const id = req.params.id
  const foundBoard = await Board.findById(id).exec()
  if (!foundBoard) {
    return res.status(401).json({ message: `Board with id ${id} not found.` })
  }
  res.status(200).json({ foundBoard })
})


// @desc update a board
// @route PATCH /boards
// @access Private
const updateBoard = asyncHandler(async (req, res) => {
  const {_id, boardUpdate} = req.body

  // Confirm data
  if (!_id || !boardUpdate) {
    return res.status(400).json({ message: 'Provide id and data to update board' })
  }

  const updatedBoard = await Board.findOneAndUpdate(
    { _id },
    {...boardUpdate},
    { new: true }
  );

  res.status(200).json({ updatedBoard })
})



module.exports = { createNewBoard, getBoards, getBoard, updateBoard, }