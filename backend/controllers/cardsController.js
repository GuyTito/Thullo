const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')
const path = require('path');



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



module.exports = { createCard, getCards }