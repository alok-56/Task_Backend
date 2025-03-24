const { validationResult } = require("express-validator");
const AppErr = require("../helper/AppError");
const Authmodel = require("../Modal/Auth");
const GenerateToken = require("../helper/generateToken");



const Signup = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { Name, Email, Password } = req.body;

    // check email
    let emailcheck = await Authmodel.findOne({ Email: Email });
    if (emailcheck) {
      return next(new AppErr("Email already exisits", 400));
    }

    // Hashing of password
    // while deploying in free platform like vercel or render issue is bcryt package issue coming

    let auth = await Authmodel.create(req.body);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "User Created Successfully",
      data: auth,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const Login = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { Email, Password } = req.body;

    // check email and Password
    let usercheck = await Authmodel.findOne({
      Email: Email,
      Password: Password,
    });
    if (!usercheck) {
      return next(new AppErr("Wrong Email or Password", 400));
    }

    // Generate Token
    let token = await GenerateToken(usercheck._id)

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Login Successfully",
      data: usercheck,
      token: token,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  Signup,
  Login,
};
