import mongoose from "mongoose";

const databaseConfig = () => {
  mongoose.connect("mongodb://localhost:27017/bookstore").then(() => {
    console.log("Database connected");
  });
};

export default databaseConfig;
