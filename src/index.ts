import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./utils/dbConnect";
import authRoutes from "./routes/authRoutes";
import formRoutes from "./routes/formRoutes";
import responseRouter from "./routes/responseRoutes";
import passport, { initialize } from "passport";
import session from "express-session";
import initializeAuth from "./config/passportConfig";

dotenv.config();
const app = express();
initializeAuth(app);
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT as string;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", formRoutes);
app.use("/api", responseRouter);

app.get("/", (request: Request, response: Response) => {
  return response.status(200).send("ok");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server listening at ${PORT}`);
});
