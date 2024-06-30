import express from "express";
import dotenv from 'dotenv';
import cors from "cors"

import userRouter from "./routes/users.js";
import commandRouter from "./routes/command.js";
import bot from "./bot/bot.js";

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());
app.use('/users', userRouter);
app.use('/command', commandRouter)

const PORT = 5000;
// const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

