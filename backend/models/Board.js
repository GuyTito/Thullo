const mongoose = require("mongoose");
const Card = require("./Card");
const List = require("./List");


const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    privacy: {
      type: Boolean,
      default: false
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

boardSchema.methods.cascadeDelete = async function () {
  await List.deleteMany({ boardId: this._id })
  await Card.deleteMany({ boardId: this._id })
};

module.exports = mongoose.model('Board', boardSchema);
// module.exports = mongoose.model('Board', boardSchema).collection.dropIndexes();