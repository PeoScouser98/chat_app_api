import MessageModel from "../models/message.model";

export const sendMessage = async (req, res) => {
	try {
		const newMessage = await new MessageModel(req.body).save();
		return res.status(201).json(newMessage);
	} catch (error) {
		return await res.status(500).json({
			message: "Opps!!! Something went wrong while sending message!",
			status: 500,
		});
	}
};
