const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../modules/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get the token from the bearer header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next(); // call next at the end of our middleware we want to be able to call the next piece of middleware
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not auth NO TOKEN");
  }
});

module.exports = { protect };
