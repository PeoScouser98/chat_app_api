import Chat from "../models/chat.model";

export const getAllChats = async (auth) => {
	try {
		return await Chat.find({ members: auth }).exec();
	} catch (error) {
		return error;
	}
};

export const getSingleChat = async (chatId) => {
	try {
		return await Chat.findOne({ _id: chatId }).exec();
	} catch (error) {
		return error;
	}
};

export const createNewChat = async (chatData) => {
	try {
		return await new Chat(chatData).save();
	} catch (error) {
		return error;
	}
};

export const deleteChat = async (chatId) => {
	try {
		return await Chat.findOneAndDelete({ _id: chatId });
	} catch (error) {
		return error;
	}
};

export const sendMessage = async (chatId, messageData) => {
	try {
		return await Chat.findOneAndUpdate(
			{ _id: chatId },
			{ $push: { messages: messageData } },
			{ new: true, upsert: true },
		).exec();
	} catch (error) {
		return error;
	}
};

export const findChat = async (user) => {
	try {
		return await Chat.findOne({ members: user }).exec();
	} catch (error) {
		return error;
	}
};
