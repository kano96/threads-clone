import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("No DB URL found");

  if (isConnected) return console.log("DB already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed", error);
  }
};
