import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

const router = express();

mongoose.connect(config.mongo.url)
	.then(startServer)
	.catch(error => {
		Logging.error("❌ Unable to connect");
		Logging.error(error);
	});

function startServer() {
	router.listen(config.server.port, () => {
		Logging.info(`✔ server is running on http://localhost:${ config.server.port }`);
	});
}