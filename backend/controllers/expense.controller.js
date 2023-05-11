const asyncHandler = require("express-async-handler");

const Expense = require("../modules/expenseModel");
const User = require("../modules/userModel");

// @desc get Expenses
// @route GET /api/Expenses
// @access Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();
  console.log("here", expenses);
  res.status(200).json(expenses);
});

// @desc Set Expense
// @route PUT /api/Expenses
// @access Private
const setExpense = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (
    !req.body.date ||
    !req.body.amount ||
    !req.body.payments ||
    !req.body.detail
  ) {
    res.status(400); //.json({ message: "please add text field" });
    throw new Error("Please add text field");
  }
  const expense = await Expense.create({
    date: req.body.date,
    amount: req.body.amount,
    payments: req.body.payments,
    detail: req.body.detail,
    user: req.user.id,
  });

  res.status(201).json(expense);
});

// @desc Update Expense
// @route GET /api/Expenses/:id
// @access Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(400);
    throw new Error("Expense not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found in update goal");
  }

  //make sure the logged in user matches the expensse user
  if (expense.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized in update");
  }

  const updatedObjectExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedObjectExpense);
});

// @desc get Expenses
// @route DELETE /api/Expenses/:id
// @access Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expenseToDelete = await Expense.findByIdAndRemove(req.params.id);

  if (!expenseToDelete) {
    res.status(400);
    throw new Error("Expense not found in delete");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found in update goal");
  }

  //make sure the logged in user matches the expensse user
  if (expenseToDelete.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized in delete");
  }

  //await expenseToDelete.find;

  //const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
};
