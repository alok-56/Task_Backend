const { validationResult } = require("express-validator");
const AppErr = require("../helper/AppError");
const Taskmodel = require("../Modal/Task");

const CreateTask = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { Title, Description } = req.body;
    req.body.User = req.user;

    let task = await Taskmodel.create(req.body);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Task Created Successfully",
      data: task,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const UpdateTask = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Task Id is required", 400));
    }
    let { Title, Description } = req.body;

    const updateData = {};
    if (Title) updateData.Title = Title;
    if (Description) updateData.Description = Description;

    let task = await Taskmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Task Updated Successfully",
      data: task,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const GetAllTask = async (req, res, next) => {
  try {
    let task = await Taskmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Task Fetched Successfully",
      data: task,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const GetTaskById = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Task Id is required", 400));
    }

    let task = await Taskmodel.findById(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Task Fetched Successfully",
      data: task,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const GetMyTask = async (req, res, next) => {
  try {
    let task = await Taskmodel.find({ User: req.user });
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Task Fetched Successfully",
      data: task,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const DeleteTask = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Task Id is required", 400));
    }

    await Taskmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Task deleted Successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  CreateTask,
  UpdateTask,
  GetAllTask,
  GetTaskById,
  GetMyTask,
  DeleteTask,
};
