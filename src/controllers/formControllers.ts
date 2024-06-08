import { Request, Response } from "express";
import Form from "../models/Form";

interface AuthRequest extends Request {
  user?: any;
}

// Create a new form (POST)
export const postForm = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, Questions } = req.body;
    const user = req.user;

    const form = new Form({
      title,
      description,
      Questions,
      createdBy: user._id,
    });
    await form.save();

    user.formId.push(form._id);
    await user.save();

    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Get all forms (GET)
export const getForms = async (req: AuthRequest, res: Response) => {
  try {
    const forms = await Form.find({ createdBy: req.user._id });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get a form by title (GET)
export const getFormsbyTitle = async (req: AuthRequest, res: Response) => {
  try {
    const form = await Form.findOne({
      title: req.params.title,
      createdBy: req.user._id,
    });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a form by ID (PUT)
export const updateFormsbyId = async (req: AuthRequest, res: Response) => {
  try {
    const form = await Form.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Delete a form by ID (DELETE)
export const deleteFormsbyId = async (req: AuthRequest, res: Response) => {
  try {
    const form = await Form.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
