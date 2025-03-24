const express = require("express");

const { body } = require("express-validator");
const { Signup, Login } = require("../Controller/Auth");
const AuthRouter = express.Router();

AuthRouter.post(
  "/signup",
  body("Name").notEmpty().withMessage("Name is required"),
  body("Email").notEmpty().withMessage("Email is required"),
  body("Password").notEmpty().withMessage("Password is required"),
  Signup
);

AuthRouter.post(
  "/login",
  body("Email").notEmpty().withMessage("Email is required"),
  body("Password").notEmpty().withMessage("Password is required"),
  Login
);

module.exports = AuthRouter;
