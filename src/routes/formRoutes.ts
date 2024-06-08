import express, { Request, Response } from "express";
import {
  deleteFormsbyId,
  getForms,
  getFormsbyTitle,
  postForm,
  updateFormsbyId,
} from "../controllers/formControllers";
import authMiddleware from "../middleware/authMiddleware";

const formRoutes = express.Router();

formRoutes.post("/forms/create", authMiddleware, postForm);

formRoutes.get("/forms", authMiddleware, getForms);

formRoutes.get("/forms/title/:title", authMiddleware, getFormsbyTitle);

formRoutes.put("/forms/:id", authMiddleware, updateFormsbyId);

formRoutes.delete("/forms/:id", authMiddleware, deleteFormsbyId);

export default formRoutes;
