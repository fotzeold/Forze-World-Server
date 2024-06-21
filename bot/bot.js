import TelegramBot from "node-telegram-bot-api";
import { userAEModelConnect } from "../utils/connection.js";
import { runCommandFromTelegram } from "../controllers/command.js";
import { stripColorCodes, transformOnlineString } from "../utils/utils.js";
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/balances/, async (msg) => {
	const chatId = msg.chat.id;

	userAEModelConnect.getAllUsers((err, data) => {
		if (err) {
			console.error('Error retrieving user authentication data: ' + err.stack);
			return;
		}

		let message = ""

		let sortedBalance = data.filter(el => el.money > 0).sort((a, b) => b.money - a.money)

		sortedBalance.forEach(element => {
			message += `${element.username} - ${element.money} FRZC\n`
		});

		bot.sendMessage(chatId, "Баланс гравців на сервері:\n\n" + message);
	});
});

bot.onText(/\/command/, async (msg) => {
	const chatId = msg.chat.id;

	if (msg.from.username === "forzeoldgg" || msg.from.username === "andrew_fackell") {

		let command = msg.text.substring(9, msg.text.length)

		if (command.length < 3) {
			return bot.sendMessage(chatId, "Ви не написали команду!");
		}
		bot.sendMessage(chatId, `Виконую команду:\n${command}`);

		runCommandFromTelegram(command).then(data => {
			if (data) {
				bot.sendMessage(chatId, 'Команда успішно виконана!\n\nРезультат: \n' + stripColorCodes(data));
			} else {
				bot.sendMessage(chatId, 'Команда успішно виконана!');
				return 'Команда успішно виконана!'
			}
		})
	} else {
		bot.sendMessage(chatId, "У вас недостатньо прав для цієї команди!");
	}
});

bot.onText(/\/online/, async (msg) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, `Дивлюсь онлайн на сервері...`);

	runCommandFromTelegram("list").then(data => {
		bot.sendMessage(chatId, transformOnlineString(stripColorCodes(data)));
	})
});

export default bot
