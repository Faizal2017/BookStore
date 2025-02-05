import express from "express";
import { Book } from "../models/Books.js";
import { CreateBook ,getAllBooks,FindBookById,updateBook,deleteBook} from "../controllers/bookCon.js";


const router = express.Router();

//create new book
router.post('/',CreateBook);

// to get all books
router.get('/',getAllBooks)


// to get book by ID
router.get('/:id',FindBookById)

//route to update a book
router.put('/:id',updateBook)

//to delete a book
router.delete('/:id',deleteBook)

export default router;
