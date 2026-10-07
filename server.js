import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import errorHandler from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);
// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
