const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.redirect("/books");
});

/* GET full list of books */
router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("layout", { books, title: "Books" });
  })
);

/* GET create new book form */
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("new-book", { book: {}, title: "New Book" });
  })
);

/* POST a new book to the database */
/* GET book detail form */
/* POST updated book info in the database */
/* POST - deletes a book */

module.exports = router;
