const Board = require('../models/Board')
const asyncHandler = require('express-async-handler')
const axios = require('axios');
const FormData = require('form-data');


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
  const { userId, title, privacy } = req.body

  // Confirm data
  if (!userId || !title ) {
    return res.status(400).json({ message: 'A user and title are required' })
  }

  // Check for duplicate title
  const duplicate = await Board.findOne({ title, userId }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate board title' })
  }

  // upload image to hosting service
  let coverImgUrl = ''
  if (req.files) {
    const userFile = req.files.userFile
    try {
      const formData = new FormData();
      formData.append('media', userFile.data, userFile.name);
      formData.append('key', process.env.THUMBSNAP_API_KEY);

      const response = await axios.post('https://thumbsnap.com/api/upload', formData, {
        headers: formData.getHeaders()
      })
      if (response.data.success) {
        coverImgUrl = response?.data.data.media
      } else {
        throw new Error(response.data.error.message)
      }
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ message: error.message })
    }
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


// @desc deletes a board
// @route   DELETE /boards
// @access Private
const deleteBoard = asyncHandler(async (req, res) => {
  const { _id } = req.body

  // Confirm data
  if (!_id) {
    return res.status(400).json({ message: 'Board ID required' })
  }

  // Confirm board exists to delete 
  const board = await Board.findById(_id).exec()

  if (!board) {
    return res.status(400).json({ message: 'Board not found' })
  }

  const deletedBoard = await board.deleteOne()
  board.cascadeDelete()

  const reply = `Board '${deletedBoard.title}' with ID ${deletedBoard._id} deleted`

  res.status(200).json({ deletedBoard, reply })
})



module.exports = { createNewBoard, getBoards, getBoard, updateBoard, deleteBoard }