import mysql from "mysql";

class UserAuthEssentModel {
	constructor(connection) {
		this.connection = connection;
	}

	getAllUsers(callback) {
		this.connection.query(
			'SELECT authme.*, Essentials_userdata.* FROM authme LEFT JOIN Essentials_userdata ON authme.username = Essentials_userdata.player_name',
			callback
		);
	}

	getUserByUsername(username, callback) {
		this.connection.query(
			'SELECT authme.*, Essentials_userdata.* FROM authme LEFT JOIN Essentials_userdata ON authme.username = Essentials_userdata.player_name WHERE authme.username = ?',
			[username],
			callback
		);
	}

	updateUserMoney(username, newMoney, callback) {
		this.connection.query(
			'UPDATE Essentials_userdata SET money = ? WHERE player_name = ?',
			[newMoney, username],
			callback
		);
	}
}

export default UserAuthEssentModel;