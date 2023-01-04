import mongoose from "mongoose";
import autopopulatePlugin from "mongoose-autopopulate";

const chatSchema = mongoose.Schema(
	{
		members: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Users",
				autopopulate: { select: "_id username avatar" },
			},
		],
		messages: [
			{
				sender: {
					type: mongoose.Types.ObjectId,
					ref: "Users",
					require: true,
					autopopulate: { select: "_id username avatar" },
				},
				text: {
					type: String,
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
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	},
);
chatSchema.virtual("lastestMessage").get(function () {
	return this.messages.length > 0 ? this.messages[this.messages.length - 1].text : "";
});

chatSchema.plugin(autopopulatePlugin);
export default mongoose.model("Chats", chatSchema);
