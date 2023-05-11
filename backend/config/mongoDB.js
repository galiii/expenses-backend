const mongoose = require("mongoose");

const connectDB = async () => {
  //console.log("hello", process.env.MONGO_DB_URI);
  try {
    //mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);

    console.info(
      `MongoDB Connected:  ${connection.connection.host}`.cyan.underline
    );
  } catch (err) {
    console.error("123123", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
