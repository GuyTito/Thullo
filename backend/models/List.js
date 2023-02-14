const mongoose = require("mongoose");
const Card = require("./Card");


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


listSchema.methods.cascadeDelete = async function() {
  await Card.deleteMany({ listId: this._id })
};

module.exports = mongoose.model('List', listSchema);