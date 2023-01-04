import createHttpError from "http-errors";

const validator = {
	checkEmail(req, res, next) {
		const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const isValidEmail = regexEmail.test(req.body.email);
		if (!isValidEmail)
			return res.json({
				status: 400,
				message: "Invalid email!",
			});
		next();
	},
};

export default validator;
