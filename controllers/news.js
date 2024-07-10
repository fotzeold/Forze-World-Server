import { NewsModelConnect } from "../utils/connection.js"

async function createNews(req, res) {
	const bodyNews = req.body.body;
	const authorNews = req.body.author;

	try {
		await NewsModelConnect.createNews(bodyNews, authorNews);
		const data = await NewsModelConnect.getAllNews();
		res.status(200).json({ status: true, message: "Новину створено", news: data });
	} catch (err) {
		res.status(400).json({ status: false, message: "Щось пішло не так...", err })
	}
}

async function getNews(req, res) {
	try {
		const data = await NewsModelConnect.getAllNews();
		res.status(200).json({ status: true, message: "Новини отримано", news: data });
	} catch (err) {
		res.status(400).json({ status: false, message: "Щось пішло не так...", err })
	}
}

async function deleteNews(req, res) {
	const newsId = req.body.newsId;

	try {
		await NewsModelConnect.deleteNewsById(newsId);
		const data = await NewsModelConnect.getAllNews();
		res.status(200).json({ status: true, message: "Новину видалено", news: data });
	} catch (err) {
		res.status(400).json({ status: false, message: "Щось пішло не так...", err })
	}
}

export { createNews, getNews, deleteNews }