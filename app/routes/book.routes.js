module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    // Create a new book
    app.post('/books', books.create);

    // Retrieve all books
    app.get('/books', books.findAll);

    // Retrieve a single book with bookId
    app.get('/books/:bookId', books.findOne);

    // Update a book with bookId
    app.put('/books/:bookId', books.update);

    // Delete a book with bookId
    app.delete('/books/:bookId', books.delete);
    app.get('/export_csv', books.export_csv);

}