import mongoose from "mongoose";
import autopopulatePlugin from "mongoose-autopopulate";

const chatSchema = mongoose.Schema({
	members: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Users",
			autopopulate: true,
		},
	],
	messages: [
		{
			sender: {
				type: mongoose.Types.ObjectId,
				ref: "Users",
				autopopulate: true,
				require: true,
			},
			text: {
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
	],
});

chatSchema.plugin(autopopulatePlugin);
export default mongoose.model("Chats", chatSchema);
