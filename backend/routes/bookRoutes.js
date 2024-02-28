import express from "express";
import Book from "../database/bookSchema.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "images/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.use(express.json());
router.get("/", (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber);
  const limit = parseInt(req.query.limit);
  const skip = (pageNumber - 1) * limit;
  Book.find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then((books) => {
      res.json(books);
    });
});

router.get("/count", async (req, res) => {
  const totalDocuments = await Book.countDocuments({});
  res.json({ totalDocuments });
});

// Assuming you have imported necessary packages and set up Express app

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.search; // Extract the search term from query parameters
    // Perform a database query to find documents matching the search term
    const searchResults = await Book.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(searchResults); // Send the search results back to the client
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.json(book);
});

// Route for creating book
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    // Extract information from request body
    const { name, author, publishYear } = req.body;

    // Extract file path from req.file
    const fileUrl = req.file ? req.file.path : null;

    // Create a new Book instance with extracted data
    const book = new Book({
      name,
      author,
      publishYear,
      fileUrl, // Add fileUrl to the book object
    });

    // Save the book to the database
    await book.save();

    // Send response
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for updating a book
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("This is updatedbookd+ ", updatedBook);
    res.json(updatedBook); // Send the updated book back to the client
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for deleting a book
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Book.findByIdAndDelete(id);
    console.log("Deleted successfully from database");
    res.status(201).send(); // Send a 204 No Content response
  } catch (error) {
    console.log("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
