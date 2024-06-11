import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  formId: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    formId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Form", default: [] },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
