const path = require('path');

const Board = require('../models/Board')
const List = require('../models/List')
const Card = require('../models/Card')
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
    coverImgUrl: imgName && `http://localhost:3000/uploads/boardCovers/${imgName}`
  })

  board.coverImgUrl = board.coverImgUrl && `${process.env.APP_URL}${board.coverImgUrl}`

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


// @desc create a list
// @route PATCH /boards/lists
// @access Private
const createList = asyncHandler(async (req, res) => {
  const { boardId, title } = req.body

  // Confirm data
  if (!boardId || !title) {
    return res.status(400).json({ message: 'A board ID and title are required' })
  }

  // Check for duplicate title
  const duplicate = await List.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate list title' })
  }

  // Create and store the new board 
  const list = await List.create({ boardId, title})

  if (list) { // Created 
    return res.status(201).json(list)
  } else {
    return res.status(400).json({ message: 'Invalid list data received' })
  }
})


// @desc get list(s) with a board id
// @route GET /boards/lists/:id
// @access Private
const getLists = asyncHandler(async (req, res) => {
  const boardId = req.params.boardId
  const foundList = await List.find({ boardId })
  if (!foundList) {
    return res.status(401).json({ message: `List(s) with board ID ${id} not found.` })
  }
  res.status(200).json(foundList)
})


// @desc Create new card
// @route POST /boards/lists/cards
// @access Private
const createCard = asyncHandler(async (req, res) => {
  const { listId, title } = req.body
  console.log('req.files', req.files)

  // Confirm data
  if (!listId || !title) {
    return res.status(400).json({ message: 'A card ID and title are required' })
  }

  // Check for duplicate title
  const duplicate = await Card.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate card title' })
  }

  // process image
  let imgPath = ''
  let imgName = ''
  if (req.files) {
    console.log('image present', req.files)
    const userFile = req.files.userFile
    imgName = `${title.replaceAll(' ', '_')}_${Date.now()}_cardCover${path.extname(userFile.name).toLowerCase()}`
    imgPath = path.join(__dirname, '..', 'uploads', 'cardCovers', imgName)
    userFile.mv(imgPath)
  }

  // Create and store the new card 
  const card = await Card.create({
    listId, title,
    coverImgUrl: imgName && `http://localhost:3000/uploads/cardCovers/${imgName}`
  })

  card.coverImgUrl = card.coverImgUrl && `${process.env.APP_URL}${card.coverImgUrl}`

  if (card) { // Created 
    return res.status(201).json(card)
  } else {
    return res.status(400).json({ message: 'Invalid card data received' })
  }

})


// @desc get cards(s) with a list id
// @route GET /boards/lists/cards/:listId
// @access Private
const getCards = asyncHandler(async (req, res) => {
  const listId = req.params.listId
  const foundCards = await Card.find({ listId })
  if (!foundCards) {
    return res.status(401).json({ message: `Card(s) with list ID ${listId} not found.` })
  }
  res.status(200).json(foundCards)
})


module.exports = { createNewBoard, getAllBoards, getBoard, updateBoard, createList, getLists, createCard, getCards }