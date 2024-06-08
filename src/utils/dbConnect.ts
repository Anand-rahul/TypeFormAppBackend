import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to Mongo");
  } catch (err) {
    console.log("Error connecting to Mongo", err);
  }
};

export default connectToMongoDB;
