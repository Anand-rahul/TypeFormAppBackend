import mongoose, { Document, Schema } from "mongoose";

interface IForm {
  title: string;
  description: string;
  Questions: mongoose.Schema.Types.ObjectId[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
interface IQuestion {
  questionText: string;
  answerType: string;
  inputType: string;
  minChar: number;
  minVal: number;
  maxVal: number;
  maxChar: number;
  options: Ioptions[];
}
interface Ioptions {
  option: string;
}

const OptionSchema: Schema = new Schema<Ioptions>({
  option: { type: String, required: true },
});

const QuestionSchema: Schema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    answerType: { type: String, required: true },
    inputType: { type: String, required: true },
    minChar: { type: Number },
    minVal: { type: Number },
    maxVal: { type: Number },
    maxChar: { type: Number },
    options: { type: [OptionSchema] },
  },
  { timestamps: true }
);

const FormSchema: Schema = new mongoose.Schema<IForm>(
  {
    title: { type: String, required: true },
    description: { type: String },
    Questions: [{ type: QuestionSchema, default: [] }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);
export default Form;
