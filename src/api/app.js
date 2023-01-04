import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import __Chat from "./routes/chat.route";
import __User from "./routes/user.route";
import { activateAccount } from "./controllers/user.controller";
import path from "path";
import allowCors, { handler } from "../config/cors.config";

const app = express();
app.use(express.json());

app.use(
	cors({
		allowedHeaders: ["token"],
		origin: "*",
		methods: ["GET", "POST", "PATCH", "PUT"],
	}),
);
app.use(
	compression({
		level: 6,
		threshold: 10 * 1000,
	}),
);
app.use(allowCors(handler));
app.use(morgan("tiny"));
app.use("/api", __Chat);
app.use("/api", __User);
app.get("/", (req, res) => {
	return res.status(200).json({
		status: 200,
		message: "Server now is running!",
	});
});
app.get("/account/activate/:token", activateAccount, (req, res) => {
	if (req.params.token) res.sendFile(path.resolve(path.join(__dirname, "/activate.html")));
});

export default app;
