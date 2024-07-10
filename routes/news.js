import express from "express";
import { createNews, getNews, deleteNews } from "../controllers/news.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js"

const newsRouter = express.Router();

newsRouter.get("/all", getNews)
newsRouter.post('/create', authenticateToken, authorizeRoles("owner", "admin"), createNews);
newsRouter.delete('/delete', authenticateToken, authorizeRoles("owner", "admin"), deleteNews);

export default newsRouter;