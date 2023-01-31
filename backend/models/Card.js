const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Board'
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'List'
    },
    title: {
      type: String,
      required: true,
    },
    coverImgUrl: {
      type: String,
    },
    description: {
      type: String,
      default: ''
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Card', cardSchema);