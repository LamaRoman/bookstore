import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import databaseConfig from "./database/databaseConfig.js";
import cors from "cors";
import path from "path"; // Import the path module

const __dirname = path.dirname(new URL(import.meta.url).pathname); // Define __dirname using import.meta.url

const app = express();

databaseConfig();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the 'images' folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("You are in backend home test page");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
