import jwt from "jsonwebtoken";
import Error from "http-errors";
import "dotenv/config";
import User from "../models/user.model";

const authenticate = async (req, res, next) => {
	try {
		const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
		req.auth = decoded.auth;
		next();
	} catch (error) {
		return res.json({
			status: 401,
			message: error.message,
			name: error.name,
		});
	}
};

export default authenticate;
