import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.ts";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use(router);

// Centralized error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});