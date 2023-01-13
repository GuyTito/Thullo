const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Board'
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('List', listSchema);