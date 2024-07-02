import express from "express";
import { createNews, getNews } from "../controllers/news.js";
const newsRouter = express.Router();

newsRouter.get("/all", getNews)
newsRouter.post('/create', createNews);

export default newsRouter;