import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const MessageSchema = new mongoose.Schema(
	{
		conversation: {
			type: mongoose.Types.ObjectId,
		},
		sender: {
			type: mongoose.Types.ObjectId,
			ref: "Users",
			require: true,
			autopopulate: { select: "_id username avatar" },
		},
		messageText: {
			type: String,
			require: true,
		},
		file: {
			type: String,
		},
		createdAt: {
			type: Number,
			default: Date.now() / 1000,
		},
	},
	{
		timestamps: true,
	},
);

MessageSchema.plugin(mongooseAutoPopulate);

const MessageModel = mongoose.model("Messages", MessageSchema);

export default MessageModel;
