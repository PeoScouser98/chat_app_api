import express from "express";
import * as _Chat from "../controllers/chat.controller";
import authenticate from "../middleware/authenticate.middleware";
const router = express.Router();

router.get("/chats", authenticate, _Chat.list);
router.get("/chats/:id", authenticate, _Chat.read);
router.post("/chats", authenticate, _Chat.create);
router.delete("/chats", authenticate, _Chat.remove);
// router.patch("/chats/:id/send-message", authenticate, _Chat.sendMessage);
router.get("/chats/:user/find-chat", authenticate, _Chat.findChat);

export default router;
