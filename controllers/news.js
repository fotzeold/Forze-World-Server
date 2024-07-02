import { NewsModelConnect } from "../utils/connection.js"

async function createNews(req, res) {
	const bodyNews = req.body.body
	const authorNews = req.body.author

	NewsModelConnect.createNews(bodyNews, authorNews, async (err, data) => {
		if (err) return res.status(500).json({ status: false, message: "Щось пішло не так...", err });
		res.status(200).json({ status: true, message: "Новину створено" });
	})
}

async function getNews(req, res) {
	NewsModelConnect.getAllNews(async (err, data) => {
		if (err) return res.status(500).json({ status: false, message: "Щось пішло не так...", err });
		res.status(200).json({ status: true, message: "Новини отримано", news: data });
	})
}

export { createNews, getNews }