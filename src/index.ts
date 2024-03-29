import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";

const app: Application = express();
const port = process.env.PORT || 8088;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
