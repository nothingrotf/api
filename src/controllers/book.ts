import { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";

const createBook = (req: Request, res: Response) => {
	const { title, author } = req.body;

	const book = new Book({
		_id: new mongoose.Types.ObjectId(),
		title,
		author
	});

	return book.save()
		.then(book => res.status(201).json({ book }))
		.catch(error => res.status(500).json({ error }));
};

const readBook = (req: Request, res: Response) => {
	const bookId = req.params.bookId;

	return Book.findById(bookId)
		.populate("author")
		.select("-__v")
		.then(book => res.status(200).json({ book }))
		.catch(() => res.status(404).json({ message: "Book not founded" }));
};

const readAll = (req: Request, res: Response) => {
	return Book.find()
		.populate("author")
		.select("-__v")
		.then(books => res.status(201).json({ books }))
		.catch(error => res.status(500).json({ error }));
};

const updateBook = (req: Request, res: Response) => {
	const bookId = req.params.bookId;

	return Book.findById(bookId)
		.populate("author")
		.select("-__v")
		.then(book => {
			if (!book) return res.status(404).json({ message: "Book not founded" });

			book.set(req.body);

			return book
				.save()
				.then(book => res.status(201).json({ book }))
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

const deleteBook = (req: Request, res: Response) => {
	const bookId = req.params.bookId;

	return Book.findByIdAndDelete(bookId)
		.populate("author")
		.select("-__v")
		.then(book => book
			? res.status(201).json({ book })
			: res.status(404).json({ message: "Book not founded" })
		)
		.catch(error => res.status(500).json({ error }));
};

export default { createBook, readBook, readAll, updateBook, deleteBook };