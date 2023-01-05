import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { activateAccount } from "./controllers/user.controller";
import __Chat from "./routes/chat.route";
import __User from "./routes/user.route";

const app = express();

app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	);
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}
	next();
});

app.use(
	compression({
		level: 6,
		threshold: 10 * 1000,
	}),
);

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
