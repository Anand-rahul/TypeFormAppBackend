import { Request, Response } from "express";
import mongoose from "mongoose";
import ResponseModel from "../models/Response";

// Submit a response to a form
export const submitResponse = async (req: Request, res: Response) => {
  try {
    const { formId, responseData } = req.body;
    const response = new ResponseModel({ formId, responseData });
    await response.save();
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch responses for a specific form
export const getResponsesByFormId = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const responses = await ResponseModel.find({
      formId: new mongoose.Types.ObjectId(formId),
    });
    res.status(200).json(responses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch a specific response by ID
export const getResponseById = async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;
    const response = await ResponseModel.findById(responseId);
    if (!response) {
      res.status(404).json({ error: "Response not found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update a response
export const updateResponse = async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;
    const updatedResponse = await ResponseModel.findByIdAndUpdate(
      responseId,
      req.body,
      { new: true }
    );
    if (!updatedResponse) {
      res.status(404).json({ error: "Response not found" });
    } else {
      res.status(200).json(updatedResponse);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a response
export const deleteResponse = async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;
    const deletedResponse = await ResponseModel.findByIdAndDelete(responseId);
    if (!deletedResponse) {
      res.status(404).json({ error: "Response not found" });
    } else {
      res.status(200).json({ message: "Response deleted successfully" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
