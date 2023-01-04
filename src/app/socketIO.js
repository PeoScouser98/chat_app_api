import { Server } from "socket.io";
import { clientURL } from "../config/env.config";

const connectSocketIO = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST", "PATCH", "PUT"],
		},
	});

	io.on("connection", (socket) => {
		console.log("user connected:>>", socket.id);
		// on user connected to server
		socket.on("online", (user) => {
			if (user) {
				socket.join(user._id);
				socket.emit("notify_user_online", { ...user, online: true });
			}
		});

		// on sending message
		socket.on("send_message", (data) => {
			socket.to(data.receiver._id).emit("receive_message", data);
		});

		// on sending notification
		socket.on("add_friend", (data) => {
			socket.to(data.receiver._id).emit("receive_invitation", {
				message: "You have new add friend invitation",
				sender: data.sender,
			});
		});

		// video call events
		socket.on("receive_call", (data) => {
			if (data) socket.join(data._id);
		});
		socket.on("call_user", (data) => {
			socket.to(data.receiver._id).emit("get_call", data);
		});
		socket.on("answer_call", (data) => {
			socket.to(data.receiver._id).emit("call_response", data);
		});
		socket.on("end_call", (data) => {
			if (data.receiver) socket.to(data.receiver._id).emit("end_call", data);
		});

		// on user disconnect from server
		socket.on("disconnected", () => {
			console.log("User disconnected!");
		});
	});
};

export default connectSocketIO;
