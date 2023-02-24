import mongoose from "mongoose";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			// minLength: 16,
		},
		password: {
			type: String,
			require: true,
			minLength: 6,
		},
		username: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
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
	this.avatar = "https://ui-avatars.com/api/?name=" + this.username.chatAt(0);
});

export default mongoose.model("Users", userSchema);
