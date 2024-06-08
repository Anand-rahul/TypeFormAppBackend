import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./utils/dbConnect";
//import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import formRoutes from "./routes/formRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT as string;
// Routes
app.use("/api/auth", authRoutes);
app.use("/api", formRoutes);

app.get("/", (request: Request, response: Response) => {
  return response.status(200).send("ok");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server listening at ${PORT}`);
});
