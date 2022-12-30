import { Server } from "socket.io";

const connectSocketIO = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3004",
			methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
		},
	});

	io.on("connection", (socket) => {
		// chat
		socket.on("join_chat", (data) => {
			console.log("chat id :>> ", data);
			socket.join(data);
		});
		socket.on("send_message", (data) => {
			console.log("send to chat id:>>>", data.chatId);
			socket.to(data.chatId).emit("receive_message", data);
		});

		// send notification
		socket.on("receive_notification", (user) => {
			if (user) {
				socket.join(user._id);
			}
		});
		socket.on("add_friend", (data) => {
			socket.to(data.receiver._id).emit("receive_invitation", {
				message: "You have new add friend invitation",
				sender: data.sender,
			});
		});

		// call
		socket.on("receive_call", (data) => {
			// console.log(data);
			if (data) socket.join(data._id);
		});
		socket.on("call_user", (data) => {
			console.log("call data:>>", data);
			socket.to(data.receiver._id).emit("get_call", data);
		});
		socket.on("answer_call", (data) => {
			socket.to(data.receiver._id).emit("call_response", data);
		});
		socket.on("end_call", (data) => {
			if (data.receiver) socket.to(data.receiver._id).emit("end_call", data);
		});
		socket.on("disconnected", () => {
			console.log("User disconnected!");
		});
	});
};

export default connectSocketIO;
