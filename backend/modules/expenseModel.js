const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "please add amount of Expense value"],
    },
    detail: String,
    payments: String,
    date: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
