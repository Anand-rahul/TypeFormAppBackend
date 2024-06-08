import mongoose, { Document, Schema } from "mongoose";

interface IResponse {
  formId: mongoose.Schema.Types.ObjectId;
  questionId: mongoose.Schema.Types.ObjectId;
  responseData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ResponseSchema: Schema = new Schema<IResponse>({
  formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  responseData: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Response = mongoose.model("Response", ResponseSchema);
export default Response;
