const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    duration: { type: String },
    year: { type: String },
    limit: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);

/*
timestamps: This is a special schema option in Mongoose. When set to true, it automatically adds two fields to each document: createdAt and updatedAt.

createdAt: This field is automatically set to the current date and time when a document is created.

updatedAt: This field is automatically updated to the current date and time whenever a document is modified or updated.
*/