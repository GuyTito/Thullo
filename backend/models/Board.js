const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    privacy: {
      type: Boolean,
      default: false
    },
    coverImgUrl: {
      type: String,
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Board', boardSchema);