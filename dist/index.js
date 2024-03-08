"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8088;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/tasks", tasks_1.default);
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
