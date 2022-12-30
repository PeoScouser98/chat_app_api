import Chat from "../models/chat.model";
import Error from "http-errors";

export const list = async (req, res) => {
	try {
		let chats = await Chat.find({ members: req.auth }).exec();
		if (!chats) throw Error.NotFound("Cannot find any chat");
		return res.status(200).json(chats);
	} catch (error) {
		return res.status(error.status).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const read = async (req, res) => {
	try {
		const chat = await Chat.findOne({ _id: req.params.id }).exec();
		if (!chat) throw Error.NotFound("Cannot find this chat!");
		return res.status(200).json(chat);
	} catch (error) {
		return res.status(error.status || 404).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const create = async (req, res) => {
	try {
		const newChat = await new Chat(req.body).save();
		return res.status(201).json(newChat);
		// handle logic ...
	} catch (error) {
		return res.status(error.status || 400).json({
			status: error.status || 400,
			message: error.message,
		});
	}
};
export const remove = async (req, res) => {
	try {
		const removedChat = await Chat.findOneAndDelete({ _id: req.params.id });
		if (!removedChat) throw Error.BadRequest("Cannot delete this chat");

		return res.json({
			message: "Chat has been removed!",
		});
	} catch (error) {
		return res.status(error.status || 400).json({
			status: error.status || 400,
			message: error.message,
		});
	}
};

export const sendMessage = async (req, res) => {
	try {
		const messages = await Chat.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { messages: req.body } },
			{ new: true, upsert: true },
		);
		return res.status(201).json(messages);
	} catch (error) {
		return res.status(error.status || 400).json({
			status: error.status || 400,
			message: error.message,
		});
	}
};

export const findChat = async (req, res) => {
	try {
		// const userChat = Chat.findOne({ members: { $elemmatch: req.params.user } });
		const userChat = await Chat.findOne({ members: req.params.user }).exec();
		console.log(userChat);
		console.log(req.params.user);
		if (!userChat)
			return res.status(200).json({
				status: 404,
				message: "There is no conversation",
			});
		return res.status(200).json(userChat);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
