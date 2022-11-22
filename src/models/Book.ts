import mongoose, { Document, Schema } from "mongoose";

export interface IBook {
	title: string;
	author: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema({
	title: { type: String, required: true },
	author: { type: mongoose.Types.ObjectId, required: true, ref: "Author" }
});

export default mongoose.model<IBookModel>("Book", BookSchema);
