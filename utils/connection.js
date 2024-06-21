import mysql from "mysql";
import UserAuthEssentModel from "../models/users.js";
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL database: ' + err.stack);
		return;
	}
	console.log('Connected to MySQL database as ID ' + connection.threadId);
});

const userAEModelConnect = new UserAuthEssentModel(connection);

export { userAEModelConnect };

