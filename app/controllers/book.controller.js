const Book = require('../models/book.model.js');

// Create and Save a new book
exports.create = (req, res) => {
	 // Validate request
    if(!req.body.author) {
        return res.status(400).send({
            message: "Book author can not be empty"
        });
    }

    // Create a Book
    const book = new Book({
        title: req.body.title || "Untitled Book", 
        author: req.body.author
    });

    // Save Book in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

};

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
	Book.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
	 Book.findById(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "book not found with id " + req.params.bookId
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving book with id " + req.params.bookId
        });
    });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body.author) {
        return res.status(400).send({
            message: "Book author can not be empty"
        });
    }

    // Find note and update it with the request body
    Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title || "Untitled Book",
        author: req.body.author
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.bookId
        });
    });
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
	Book.findByIdAndRemove(req.params.bookId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.bookId
        });
    });
};