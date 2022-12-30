import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 465,
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASS,
	},
});

export default transporter;
