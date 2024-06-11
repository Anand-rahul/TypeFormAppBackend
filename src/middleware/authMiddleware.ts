import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User"; // Adjust the path as necessary

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);

    req.user = await User.findById(decoded.user._id);
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: "Unauthorized" });
  }
};

// export const googleAuthMiddleware = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
// if (req.isAuthenticated()) {
//   console.log(req.user);
//   return next();
// }
//   res.redirect("http://localhost:8080/api/auth/google");
// };
export default authMiddleware;
