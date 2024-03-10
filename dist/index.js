import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
const app = express();
const port = process.env.PORT || 8088;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
app.listen(port, () => {
    console.log(`Express server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map