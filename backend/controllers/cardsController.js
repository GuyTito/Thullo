const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')
const axios = require('axios'); 
const FormData = require('form-data');


// @desc Create new card
// @route POST /boards/lists/cards
// @access Private
const createCard = asyncHandler(async (req, res) => {
  const { boardId, listId, title } = req.body

  // Confirm data
  if (!listId || !title || !boardId) {
    return res.status(400).json({ message: 'A list ID, board ID and title are required' })
  }

  // Check for duplicate title
  const duplicate = await Card.findOne({ title, boardId }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate card title' })
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
      if (response.data.success){
        coverImgUrl = response?.data.data.media
      }else{
        throw new Error(response.data.error.message)
      }
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ message: error.message })
    }
  }

  // Create and store the new card 
  const card = await Card.create({
    listId, title, boardId, coverImgUrl
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