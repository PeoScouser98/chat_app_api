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

app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
