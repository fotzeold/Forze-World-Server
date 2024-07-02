import mysql from "mysql";

class NewsModel {
	constructor(connection) {
		this.connection = connection;
	}

	createNews(body, author, callback) {
		const date = new Date();
		this.connection.query(
			'INSERT INTO news (body, author, date) VALUES (?, ?, ?)',
			[body, author, date],
			(err, result) => {
				if (err) {
					callback(err, null);
					return;
				}
				callback(null, result);
			}
		);
	}

	getAllNews(callback) {
		this.connection.query(
			'SELECT * FROM news ORDER BY date DESC',
			(err, results) => {
				if (err) {
					callback(err, null);
					return;
				}
				callback(null, results);
			}
		);
	}
}

export default NewsModel;