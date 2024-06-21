import { RconConnection } from "@scriptserver/core";
import dotenv from 'dotenv';
dotenv.config();

const rconConnection = new RconConnection({
	rconConnection: {
		host: process.env.RCON_HOST,
		port: process.env.RCON_PORT,
		password: process.env.RCON_PASSWORD,
		buffer: 8192
	}
});

rconConnection.on('connected', () => {
	console.log('RCON Підключено');
});

rconConnection.on('disconnected', () => {
	console.log('RCON Відключено');
});

rconConnection.on('error', (error) => {
	console.error('Помилка RCON:', error);
});

rconConnection.connect();

async function runCommandFromTelegram(command) {
	return await rconConnection.send(command)
		.then((data) => {
			return data
		})
		.catch((error) => {
			return 'Помилка виконання команди!\n\nПомилка: ' + error;
		});
}

function runCommand(req, res) {
	const command = req.body.command;

	if (!command) {
		return res.status(400).send('Не вказана команда');
	}

	rconConnection.send(command)
		.then(() => {
			res.send('Команда виконана');
		})
		.catch((error) => {
			res.status(500).send('Помилка виконання команди', error);
		});
}

export { runCommand, runCommandFromTelegram }