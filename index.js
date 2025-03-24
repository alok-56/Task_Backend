const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrHandler = require("./Middleware/globalError");
const AppErr = require("./helper/AppError");
const DatabaseConnection = require("./Config/DatabaseConnection");
const AuthRouter = require("./Route/Auth");
const TaskRouter = require("./Route/Task");

require("dotenv").config();
DatabaseConnection();
const app = express();

// global Middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors(""));
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());

// Route Middleware
app.use("/api/v1/Auth", AuthRouter);
app.use("/api/v1/Task", TaskRouter);

//Not Found Route Page
app.use("*", (req, res, next) => {
  return next(new AppErr("Route Not Found", 404));
});

// Global Error
app.use(globalErrHandler);

const PORT = process.env.PORT || 3000;
const Applisten = () => {
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
};
Applisten();
