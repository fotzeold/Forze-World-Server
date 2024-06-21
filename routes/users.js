import express from "express";
import { getAllUsers, loginUser, updateMoney } from "../controllers/users.js";
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/login', loginUser);
userRouter.post('/money', updateMoney);

export default userRouter;