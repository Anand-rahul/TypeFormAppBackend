import { Router } from "express";
import {
  submitResponse,
  getResponsesByFormId,
  getResponseById,
  updateResponse,
  deleteResponse,
} from "../controllers/responseControllers"; // Adjust the import path as necessary

const responseRouter = Router();

responseRouter.post("/responses", submitResponse);
responseRouter.get("/responses/:formId", getResponsesByFormId);
responseRouter.get("/responses/details/:responseId", getResponseById);
responseRouter.put("/responses/:responseId", updateResponse);
responseRouter.delete("/responses/:responseId", deleteResponse);

export default responseRouter;
