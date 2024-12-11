import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(">>> Conectado a mongo");
  } catch (error) {
    console.log(error);
  }
};
