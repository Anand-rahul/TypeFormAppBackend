import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  username: string;
  email: string;
  password: string;
  formId: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    formId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Form", default: [] },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
