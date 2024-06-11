import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; //firebase for authentication
import User from "../models/User"; // Adjust the path as necessary
import passport from "passport";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const hasedpass: any = user?.password;
    if (!user || !(await bcrypt.compare(password, hasedpass))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const googleAuthenticate = async (req: Request, res: Response) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  });
};

export const googleAuthenticateCallback = async (
  req: Request,
  res: Response
) => {
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
    (req: Request, res: Response) => {
      console.log(req.user);

      const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      res.cookie("jwtToken", token);
      res.status(200).json({ token });
    };
};

export const googleAuthenticateLogout = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect("/");
  });
};
