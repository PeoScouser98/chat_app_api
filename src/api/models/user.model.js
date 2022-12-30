import mongoose from "mongoose";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

const userSchema = mongoose.Schema(
	{
		account: {
			type: String,
			require: true,
			minLength: 3,
		},
		password: {
			type: String,
			require: true,
			minLength: 3,
		},
		username: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			default: "https://placeimg.com/192/192/people",
		},
		friends: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Users",
			},
		],
		peerId: String,
	},

	{
		timestamps: true,
	},
);

userSchema.methods.encryptPassword = function (password) {
	return hashSync(password, genSaltSync(10));
};

userSchema.methods.authenticate = function (password) {
	return compareSync(password, this.password);
};

userSchema.pre("save", function () {
	this.password = this.encryptPassword(this.password);
});

export default mongoose.model("Users", userSchema);
