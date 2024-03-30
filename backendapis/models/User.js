const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: "text", lastName: "text" });

module.exports = model("User", userSchema);
