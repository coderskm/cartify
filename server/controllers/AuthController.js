const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");
const { errorHandler } = require("../utils/error");

/* 
1. api to register user, login user and logout user with basic validations
*/

const register = async (req, res, next) => {
  const { fullname, email, username, password } = req.body;
   const validUserCheck2 = await userModel.findOne({ email });
   if (validUserCheck2) {
     return next(errorHandler(400, "email already exists!"));
   }
  const validUserCheck1 = await userModel.findOne({ username });
  if (validUserCheck1) {
    return next(errorHandler(400, "username already exists!"));
  }
  if (password.trim().length < 6) {
    return next(errorHandler(400, "password should have more than 5 characters!"));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new userModel({ fullname, email, username, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(201).json("User Created Successfully !!!");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await userModel.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credential"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user has been logged out !");
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout };
