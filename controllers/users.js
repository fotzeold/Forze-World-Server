import { userAEModelConnect } from "../utils/connection.js";
import sha256 from "sha256";

async function getAllUsers(req, res) {
	userAEModelConnect.getAllUsers((err, data) => {
		if (err) {
			return res.status(500).json({ status: false, message: err });
		}
		return res.status(200).json({ status: true, users: data });
	});
}

async function loginUser(req, res) {
	let username = req.body.username
	let password = req.body.password

	if (!username || !password) return res.status(404).json({ status: false, message: "Ви не передали імя або пароль!" });

	userAEModelConnect.getUserByUsername(username, async (err, data) => {
		if (err) {
			return res.status(500).json({ status: false, message: err });
		}
		const [prefix, salt, hash] = data[0].password.split('$').slice(1);

		const firstHash = sha256(password);
		const computedHash = sha256(firstHash + salt)

		if (computedHash === hash) {
			return res.status(200).json({ status: true, user: { ...data[0], password: hash } });
		}

		return res.status(404).json({ status: false, message: "Не вірний логін або пароль!" });
	})
}

async function updateMoney(req, res) {
	let username = req.body.username
	let userHash = req.body.userHash
	let param = req.body.param
	let summa = +req.body.summa

	if (!username || !userHash || !summa) return res.status(404).json({ status: false, message: "Ви передали не вірні дані" });

	userAEModelConnect.getUserByUsername(username, async (err, data) => {
		if (err) {
			return res.status(500).json({ status: false, message: err });
		}
		const hash = data[0].password.split('$')[3]

		if (userHash !== hash) return res.status(404).json({ status: false, message: "Ви передали не вірні дані" });

		const currMoney = +data[0].money
		let newMoney

		if (param) {
			newMoney = currMoney + summa
		} else {
			if (currMoney < summa) return res.status(400).json({ status: false, message: "Недостатньо коштів на балансі!" });
			newMoney = currMoney - summa
		}

		userAEModelConnect.updateUserMoney(username, newMoney, (err, data) => {
			if (err) {
				return res.status(500).json({ status: false, message: err });
			}
			return res.status(200).json({ status: true, message: "Баланс оновлено!", newMoney });
		})
	})
}

export { getAllUsers, loginUser, updateMoney }