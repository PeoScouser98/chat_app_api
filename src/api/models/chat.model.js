import mongoose from "mongoose";
import autopopulatePlugin from "mongoose-autopopulate";

const ChatSchema = mongoose.Schema(
	{
		members: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Users",
				autopopulate: { select: "_id username avatar" },
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	},
);
ChatSchema.virtual("messages", {
	ref: "Messages",
	localField: "_id",
	foreignField: "conversation",
});
ChatSchema.virtual("lastestMessage").get(function () {
	return this.messages.at(this.message.length - 1).messageText;
});

ChatSchema.plugin(autopopulatePlugin);

const ChatModel = mongoose.model("Chats", ChatSchema);
export default ChatModel;
