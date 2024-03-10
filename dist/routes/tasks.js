import { Router } from "express";
import { body, validationResult } from "express-validator";
const router = Router();
let tasks = [];
const taskValidationRules = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("completed").isBoolean().withMessage("Completed must be a boolean"),
];
router.get("/", (req, res) => {
    res.json(tasks);
});
router.post("/", taskValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    tasks.push(task);
    res.status(201).json(task);
});
router.get("/:id", (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ message: "Task Not Found!" });
    }
    else {
        res.json(task);
    }
});
router.put("/:id", taskValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const task = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ message: "Task Not Found!" });
    }
    else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;
        res.json(task);
    }
});
router.delete("/:id", (req, res) => {
    const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: "Task Not Found!" });
    }
    else {
        tasks.splice(index, 1);
        res.status(204).json({ message: "Successfully deleted!" });
    }
});
export default router;
//# sourceMappingURL=tasks.js.map