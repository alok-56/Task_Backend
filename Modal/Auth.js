const { default: mongoose } = require("mongoose");

const Authschema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Authmodel = mongoose.model("Authentication", Authschema);
module.exports = Authmodel;
