import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import __Chat from "./routes/chat.route";
import __User from "./routes/user.route";
import { activateAccount } from "./controllers/user.controller";

const app = express();
app.use(express.json());

app.use(cors());
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
	res.sendFile(path.resolve(__dirname, "activate.html"));
});

export default app;
