import { Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";

const createAuthor = (req: Request, res: Response) => {
	const { name } = req.body;

	const author = new Author({
		_id: new mongoose.Types.ObjectId(),
		name
	});

	return author.save()
		.then(author => res.status(201).json({ author }))
		.catch(error => res.status(500).json({ error }));
};

const readAuthor = (req: Request, res: Response) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then(author => res.status(200).json({ author }))
		.catch(() => res.status(404).json({ message: "Author not founded" }));
};

const readAll = (req: Request, res: Response) => {
	return Author.find()
		.then(authors => res.status(201).json({ authors }))
		.catch(error => res.status(500).json({ error }));
};

const updateAuthor = (req: Request, res: Response) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then(author => {
			if (!author) return res.status(404).json({ message: "Author not founded" });

			author.set(req.body);

			return author
				.save()
				.then(author => res.status(201).json({ author }))
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

const deleteAuthor = (req: Request, res: Response) => {
	const authorId = req.params.authorId;

	return Author.findByIdAndDelete(authorId)
		.then(author => author
			? res.status(201).json({ author })
			: res.status(404).json({ message: "Author not founded" })
		)
		.catch(error => res.status(500).json({ error }));
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };