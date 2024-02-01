import express from "express";
import error from "../middleware/errorMiddleware";
import publicRouter from "../router/public";

export const web = express();

web.use(express.json());

web.use(publicRouter)

web.use(error)