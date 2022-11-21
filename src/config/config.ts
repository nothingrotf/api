import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.DB_USER || "";
const MONGO_PASSWORD = process.env.DB_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${ MONGO_USERNAME }:${ MONGO_PASSWORD }@cluster0.itdlfwk.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT ? Number( process.env.SERVER_PORT ) : 3001;

export const config = {
	mongo: {
		url: MONGO_URL
	},
	server: {
		port: SERVER_PORT
	}
};