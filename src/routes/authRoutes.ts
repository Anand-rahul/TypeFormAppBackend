import express, { Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/authControllers";

const authRoutes = express.Router();

//Register a User
authRoutes.post("/register", registerUser);

// Login a user
authRoutes.post("/login", loginUser);

export default authRoutes;
