import mongoose, { Document, Schema } from "mongoose";

interface IResponse {
  formId: mongoose.Schema.Types.ObjectId;
  responseData: IResp[];
}

interface IResp {
  question: string;
  answer: any;
}

const ResponseOutputSchema: Schema = new Schema<IResp>({
  question: { type: String, required: true },
  answer: { type: Schema.Types.Mixed, required: true },
});

const ResponseSchema: Schema = new Schema<IResponse>(
  {
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    responseData: { type: [ResponseOutputSchema], required: true },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", ResponseSchema);
export default Response;
