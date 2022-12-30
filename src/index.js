import http from "http";
import app from "./api/app";
import connectSocketIO from "./app/socketIO";
import "dotenv/config";
import mongoose from "mongoose";
import connectMongoDb from "./config/mongodb.config";
import "babel-polyfill";

const PORT = process.env.PORT || 3004;
const server = http.createServer(app);

server.listen(PORT, () => {
	if (process.env.NODE_ENV.toLowerCase().localeCompare("production")) {
		console.log(`Server is listening on: http://localhost:${PORT}`);
	}
	connectSocketIO(server);
});

connectMongoDb();
