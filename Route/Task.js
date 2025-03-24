const express = require("express");
const { body } = require("express-validator");
const IsLogin = require("../Middleware/IsLogin");
const {
  CreateTask,
  UpdateTask,
  GetAllTask,
  GetTaskById,
  DeleteTask,
  GetMyTask,
} = require("../Controller/Task");
const TaskRouter = express.Router();

TaskRouter.post(
  "/create",
  body("Title").notEmpty().withMessage("Title is required"),
  body("Description").notEmpty().withMessage("Description is required"),
  IsLogin,
  CreateTask
);

TaskRouter.patch("/update/:id", IsLogin, UpdateTask);

TaskRouter.get("/get", IsLogin, GetAllTask);

TaskRouter.get("/get/:id", IsLogin, GetTaskById);

TaskRouter.get("/mytask", IsLogin, GetMyTask);

TaskRouter.delete("/delete/:id", IsLogin, DeleteTask);

module.exports = TaskRouter;
