import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";

const router = express();

mongoose.connect(config.mongo.url)
	.then(() => {
		Logging.info("✔ Connected to MongoDB");
		startServer();
	})
	.catch(error => {
		Logging.error("❌ Unable to connect");
		Logging.error(error);
	});

const startServer = () => {
	router.use((req, res, next) => {
		// Log the Request //
		Logging.info(`Incomming -> Method: [${ req.method }] - Url: [${ req.url }] - IP: [${ req.socket.remoteAddress }]`);

		// Log the Response //
		Logging.info(`Incomming -> Method: [${ req.method }] - Url: [${ req.url }] - IP: [${ req.socket.remoteAddress }] - Status: [${ res.statusCode}]`);

		next();
	});

	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());

	// API Rules //
	router.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

		if( req.method === "OPTIONS" ) {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}

		next();
	});

	// Routes //
	router.use("/", authorRoutes);
	router.use("/", bookRoutes);


	// HealthCheck //
	router.get("/ping", (req, res) => res.status(200).json({ message: "pong"}));


	// Error Handling //
	router.use((req, res) => {
		const ERROR = new Error("not founded");
		Logging.error(ERROR);

		return res.status(404).json({ message: ERROR.message });
	});

	router.listen(config.server.port, () => {
		Logging.info(`🚀 HTTP Server running on port: [${ config.server.port }].`);
	});
};