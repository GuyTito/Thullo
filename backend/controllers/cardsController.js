const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')
const path = require('path');



// @desc Create new card
// @route POST /boards/lists/cards
// @access Private
const createCard = asyncHandler(async (req, res) => {
  const { boardId, listId, title } = req.body
  console.log('req.files', req.files)

  // Confirm data
  if (!listId || !title || !boardId) {
    return res.status(400).json({ message: 'A list ID, board ID and title are required' })
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
    listId, title, boardId,
    coverImgUrl: imgName && `http://localhost:3000/uploads/cardCovers/${imgName}`
  })


  if (card) { // Created 
    return res.status(201).json(card)
  } else {
    return res.status(400).json({ message: 'Invalid card data received' })
  }

})


// @desc get cards(s) with a list id
// @route GET /cards/:boardId
// @access Private
const getCardsByBoardId = asyncHandler(async (req, res) => {
  const boardId = req.params.boardId
  const foundCards = await Card.find({ boardId })
  if (!foundCards) {
    return res.status(401).json({ message: `Card(s) with list ID ${boardId} not found.` })
  }
  res.status(200).json(foundCards)
})


// @desc update a card
// @route PATCH /cards
// @access Private
const updateCard = asyncHandler(async (req, res) => {
  const { _id, cardUpdate } = req.body

  // Confirm data
  if (!_id || !cardUpdate) {
    return res.status(400).json({ message: 'Provide id and data to update card' })
  }

  const updatedCard = await Card.findOneAndUpdate(
    { _id },
    { ...cardUpdate },
    { new: true }
  );

  res.status(200).json({ updatedCard })
})


// @desc deletes a card
// @route   DELETE /cards
// @access Private
const deleteCard = asyncHandler(async (req, res) => {
  const { _id } = req.body

  // Confirm data
  if (!_id) {
    return res.status(400).json({ message: 'Card ID required' })
  }

  // Confirm card exists to delete 
  const card = await Card.findById(_id).exec()

  if (!card) {
    return res.status(400).json({ message: 'Card not found' })
  }

  const deletedCard = await card.deleteOne()

  const reply = `Card '${deletedCard.title}' with ID ${deletedCard._id} deleted`

  res.status(200).json({ deletedCard, reply })
})



module.exports = { createCard, getCardsByBoardId, updateCard, deleteCard }