import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  googleAuthenticate,
  googleAuthenticateCallback,
  googleAuthenticateLogout,
  loginUser,
  registerUser,
} from "../controllers/authControllers";
import passport from "passport";
import User from "../models/User";

const authRoutes = express.Router();

// Register a User
authRoutes.post("/register", registerUser);

// Login a user
authRoutes.post("/login", loginUser);

// Google OAuth
authRoutes.get("/google", googleAuthenticate);

authRoutes.get("/google/callback", googleAuthenticateCallback);

authRoutes.get("/logout", googleAuthenticateLogout);

export default authRoutes;
