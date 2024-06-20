import { DB_NAME } from "@/utils/contants";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOBD_URL}${DB_NAME}`
    );
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(
        `MongoDB is Hosted !! on : ${connectionInstance.connection.host}`
      );
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
};
