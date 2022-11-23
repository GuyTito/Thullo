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
    description: {
      type: String,
      required: true
    },
    visibility: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Board', boardSchema);