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

// delete card with this listId
listSchema.pre('remove', async (next) => {
  console.log('before delete');
  console.log('listId', this._id);
  // await Card.deleteMany({ listId: this._id })
  next()
});

module.exports = mongoose.model('List', listSchema);