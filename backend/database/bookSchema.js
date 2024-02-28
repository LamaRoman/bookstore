import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
  },
  publishYear: {
    type: Number,
  },
  fileUrl: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
