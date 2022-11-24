import mongoose, { Document, Schema } from "mongoose";

export interface IAddress {
	line_1: string;
	line_2?: string;
	zip_code: string;
	city: string;
	state: string;
	country: string;
}

export interface IPublisher  {
	name: string;
	address: IAddress;
}

export interface IPublisherModel extends IPublisher, Document {}

const PublisherSchema: Schema = new Schema({
	name: { type: String, required: true },
	address: {
		line_1: { type: String, required: true },
		line_2: { type: String, required: false },
		zip_code: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true }
	}
});

export default mongoose.model<IPublisherModel>("Publisher", PublisherSchema);