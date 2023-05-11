const express = require("express"); // is our backend web framework
const colors = require("colors");
const { connectDB } = require("./config/mongoDB");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config(); //environment variables
const port = process.env.PORT || 5000; // process.env.port what that does is it allows to access the port variable in my .env and we can use this anywhere in our server

connectDB();
const app = express(); //initialize express -

//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for url encoded we

app.use("/", require("./routes/expenses.routes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler); //that'll overwrite the default express error handler

app.listen(port, () => console.log(`Server started at port ${port}`));
