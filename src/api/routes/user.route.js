import express from "express";
import * as _User from "../controllers/user.controller";
import authenticate from "../middleware/authenticate.middleware";

const router = express.Router();

router.post("/signup", _User.signup);
router.post("/signin", _User.signin);
router.get("/user", authenticate, _User.getUser);
router.post("/refresh-token", _User.refreshToken);
router.post("/users/search", _User.findUser);

export default router;
