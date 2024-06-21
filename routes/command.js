import express from "express";
import { runCommand } from "../controllers/command.js";
const commandRouter = express.Router();

commandRouter.post("/", runCommand);

export default commandRouter;