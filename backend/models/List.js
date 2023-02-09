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


listSchema.post('deleteOne', async (doc) => {
  console.log('After deleteOne');
  console.log('doc', doc);
  // await Card.deleteMany({ listId: doc._id })
});

module.exports = mongoose.model('List', listSchema);