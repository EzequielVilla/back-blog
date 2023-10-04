import express from "express";
import "dotenv/config";
import morgan from "morgan";
import V1Router from "./internal/routes/v1";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.use("/api/v1", V1Router);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});

export { app };
