import User from "../models/user.model";
import Error from "http-errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signup = async (req, res) => {
	try {
		const existAccount = await User.findOne({ account: req.body.account });
		if (existAccount) throw Error.BadRequest("Account already exist!");

		const newAccount = await new User(req.body).save();

		return res.status(201).json(newAccount);
		// handle logic ...
	} catch (error) {
		console.log(error.message);
		return res.status(error.status || 400).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const signin = async (req, res) => {
	try {
		const user = await User.findOne({ account: req.body.account }).exec();
		if (!user) {
			throw Error.NotFound("Account does not exist!");
		}
		if (!user.authenticate(req.body.password)) {
			throw Error.Unauthorized("Password is incorrect!");
		}
		const accessToken = jwt.sign({ auth: user._id }, process.env.SECRET_KEY, { expiresIn: "5m" });
		console.log(user);
		return res.status(200).json({
			accessToken: accessToken,
			auth: user._id,
		});
	} catch (error) {
		return res.status(error.status || 400).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const refreshToken = async (req, res) => {
	try {
		const newAccessToken = jwt.sign({ auth: req.body.authId }, process.env.SECRET_KEY, { expiresIn: "15m" });
		return res.status(201).json(newAccessToken);
	} catch (error) {
		return res.json({
			status: error.status || 400,
			message: error.message,
		});
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.auth }).select("-password");
		return res.status(200).json({ user, status: 200 });
	} catch (error) {
		return res.status(error.status || 404).json({
			status: error.status,
			message: error.message,
		});
	}
};
export const findUser = async (req, res) => {
	try {
		const pattern = new RegExp(`${req.body.keyword}`, "gi");
		console.log(pattern);
		const users = await User.find({ username: { $regex: pattern } }).limit(5);
		return res.status(200).json(users);
	} catch (error) {
		return res.status(error.status || 404).json({
			status: error.status,
			message: error.message,
		});
	}
};
