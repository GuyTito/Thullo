const List = require('../models/List')
const asyncHandler = require('express-async-handler')



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
  const list = await List.create({ boardId, title })

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



module.exports = { createList, getLists }