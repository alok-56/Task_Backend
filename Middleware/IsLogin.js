const AppErr = require("../helper/AppError");
const verifyToken = require("../helper/VerifyToken");

const Authmodel = require("../Route/Auth");

const IsLogin = async (req, res, next) => {
  try {
    let token = req.headers.Authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return next(new AppErr("Unauthorized User", 401));
    }
    token = token.split(" ")[1];

    let { id } = await verifyToken(token);
    req.user = id;
    let user = await Authmodel.findById(id);
    if (!user) {
      return next(new AppErr("Invalid Token", 401));
    }

    return next();
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = IsLogin;
