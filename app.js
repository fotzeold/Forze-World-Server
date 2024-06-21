import express from "express";
import userRouter from "./routes/users.js";
import commandRouter from "./routes/command.js";
import bot from "./bot/bot.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/command', commandRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

