const validator = {
	checkEmail(email) {
		const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return regexEmail.test(email);
	},
};

export default validator;
