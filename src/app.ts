import express from "express";
import cors from "cors";
import modules from "./modules";
import errorHandler from "./shared/errorHandler";

const app = express();

// Allow requests from the React app
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Parse JSON bodies
app.use(express.json());

// Initialize all modules
modules.forEach((module) => module(app));

// Use the error handler middleware
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});

app.get("/", (req, res) => {
  res.send("Hello World yo");
});

export default app;
