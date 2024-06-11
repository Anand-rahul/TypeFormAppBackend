import { Router } from "express";
import {
  submitResponse,
  getResponsesByFormId,
  getResponseById,
  updateResponse,
  deleteResponse,
} from "../controllers/responseControllers"; // Adjust the import path as necessary
import authMiddleware from "../middleware/authMiddleware";

const responseRouter = Router();

responseRouter.post("/responses", authMiddleware, submitResponse);
responseRouter.get("/responses/:formId", authMiddleware, getResponsesByFormId);
responseRouter.get(
  "/responses/details/:responseId",
  authMiddleware,
  getResponseById
);
responseRouter.put("/responses/:responseId", authMiddleware, updateResponse);
responseRouter.delete("/responses/:responseId", authMiddleware, deleteResponse);

export default responseRouter;
