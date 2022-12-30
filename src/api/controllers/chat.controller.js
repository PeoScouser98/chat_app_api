import * as ChatServices from "../services/chat.service";
import createHttpError from "http-errors";

export const list = async (req, res) => {
	try {
		const chats = await ChatServices.getAllChats();
		if (!chats) throw createHttpError.NotFound("Cannot find any chat");
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
		const chat = await ChatServices.getSingleChat(req.params.id);
		if (!chat) throw createHttpError.NotFound("Cannot find this chat!");
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
		const newChat = await ChatServices.createNewChat(req.body);
		return res.status(201).json(newChat);
	} catch (error) {
		return res.status(error.status || 400).json({
			status: error.status || 400,
			message: error.message,
		});
	}
};
export const remove = async (req, res) => {
	try {
		const removedChat = await ChatServices.deleteChat(req.params.id);
		if (!removedChat) throw createHttpError.BadRequest("Cannot delete this chat");

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
		const messages = await ChatServices.sendMessage(req.params.id, req.body);
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
		const userChat = await ChatServices.findChat(req.params.user);
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
