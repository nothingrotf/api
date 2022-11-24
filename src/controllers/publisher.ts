import { Request, Response } from "express";
import mongoose from "mongoose";
import Publisher from "../models/Publisher";

const createPublisher = (req: Request, res: Response) => {
	const { name, address } = req.body;

	const publisher = new Publisher({
		_id: new mongoose.Types.ObjectId(),
		name,
		address
	});

	return publisher.save()
		.then(publisher => res.status(201).json({ publisher }))
		.catch(error => res.status(500).json({ error }));
};

const readPublisher = (req: Request, res: Response) => {
	const publisherId = req.params.publisherId;

	return Publisher.findById(publisherId)
		.select("-__v")
		.then(publisher => res.status(200).json({ publisher }))
		.catch(() => res.status(404).json({ message: "Publisher not founded" }));
};

const readAll = (req: Request, res: Response) => {
	return Publisher.find()
		.select("-__v")
		.then(publishers => res.status(201).json({ publishers }))
		.catch(error => res.status(500).json({ error }));
};

const updatePublisher = (req: Request, res: Response) => {
	const publisherId = req.params.publisherId;

	return Publisher.findById(publisherId)
		.select("-__v")
		.then(publisher => {
			if (!publisher) return res.status(404).json({ message: "Publisher not founded" });

			publisher.set(req.body);

			return publisher
				.save()
				.then(publisher => res.status(201).json({ publisher }))
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

const deletePublisher = (req: Request, res: Response) => {
	const publisherId = req.params.publisherId;

	return Publisher.findByIdAndDelete(publisherId)
		.select("-__v")
		.then(publisher => publisher
			? res.status(201).json({ publisher })
			: res.status(404).json({ message: "Publisher not founded" })
		)
		.catch(error => res.status(500).json({ error }));
};

export default { createPublisher, readPublisher, readAll, updatePublisher, deletePublisher };