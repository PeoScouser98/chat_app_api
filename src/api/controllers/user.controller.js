import User from "../models/user.model";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import transporter from "../../config/nodemailer.config";

export const signup = async (req, res) => {
	try {
		const existAccount = await User.findOne({ account: req.body.account });
		if (existAccount) throw createHttpError.BadRequest("Account already exist!");
		const isProductionEnv = process.env.NODE_ENV.toLowerCase().localeCompare("production");
		const verifyAccountUrl = isProductionEnv ? process.env.VERIFY_ACCOUNT_URL : process.env.LOCAL_VERIFY_ACCOUNT_URL;
		const token = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: "5m" });
		const info = await transporter.sendMail({
			from: process.env.AUTH_EMAIL,
			to: req.body.email,
			subject: "Thank you for creating new account ...",
			html: `<p>Click on the link below <a href='${verifyAccountUrl}?token=${token}'>link</a> to activate your account </p>`,
		});
		return res.status(201).json(info);
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
			throw createHttpError.NotFound("Account does not exist!");
		}
		if (!user.authenticate(req.body.password)) {
			throw createHttpError.Unauthorized("Password is incorrect!");
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

export const activateAccount = async (req, res) => {
	try {
		const accessToken = req.params.token;
	} catch (error) {
		// handle errors
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
