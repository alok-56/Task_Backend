const { default: mongoose } = require("mongoose");

const Taskschema = new mongoose.Schema(
  {
    User: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Taskmodel = mongoose.model("Task", Taskschema);
module.exports = Taskmodel;
