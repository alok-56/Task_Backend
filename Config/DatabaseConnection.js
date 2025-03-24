const mongoose = require("mongoose");
require("dotenv").config();

const DatabaseConnection = () => {
  mongoose
    .connect(process.env.DTATBASE_URL)
    .then((res) => {
      console.log("Mongodb Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = DatabaseConnection;
