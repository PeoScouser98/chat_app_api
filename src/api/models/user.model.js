import mongoose from "mongoose";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
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
		photoUrl: {
			type: String,
		},
		friends: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Users",
			},
		],
	},

	{
		timestamps: true,
	},
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
