import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";

const router = express();

mongoose.connect(config.mongo.url)
	.then(startServer)
	.catch(error => {
		throw new Error(error);
	});

function startServer() {
	router.listen(config.server.port, () => {
		console.log(`✔ server is running on http://localhost:${ config.server.port }`);
	});
}