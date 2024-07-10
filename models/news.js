import mysql from "mysql";

class NewsModel {
	constructor(connection) {
		this.connection = connection;
	}

	createNews(body, author) {
		const date = new Date();
		return new Promise((resolve, reject) => {
			this.connection.query(
				'INSERT INTO news (body, author, date) VALUES (?, ?, ?)',
				[body, author, date],
				(err, result) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				}
			);
		});
	}

	getAllNews() {
		return new Promise((resolve, reject) => {
			this.connection.query(
				'SELECT * FROM news ORDER BY date DESC',
				(err, results) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(results);
				}
			);
		});
	}

	deleteNewsById(id) {
		return new Promise((resolve, reject) => {
			this.connection.query(
				'DELETE FROM news WHERE id = ?',
				[id],
				(err, result) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				}
			);
		});
	}
}

export default NewsModel;