const express = require("express"); // is our backend web framework
const router = express.Router();
const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

const { protect } = require("../middleware/authMiddleware");

//routes /expenses
router.get("/", getExpenses);
router.post("/", protect, setExpense);

//router.route("/").get(getGoals).post(setGoal);

router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

//router.route("/:id").delete(deleteExpense).put(updateExpense);

module.exports = router;
