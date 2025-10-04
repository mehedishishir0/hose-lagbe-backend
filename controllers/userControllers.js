const createError = require("http-errors");
const { successResponse } = require("../response/response");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");

exports.userGet = async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "login first");
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      throw createError(401, "user not found");
    }
    successResponse(res, {
      statusCode: 200,
      message: "user found",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.sginUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { fullName, email, password, phoneNmber } = req.body;
    if (!fullName || !email || !password || !phoneNmber) {
      throw createError(400, "all fields are required");
    }
    const user = await userModel.findOne({ email });
    if (user) {
      throw createError(400, "user already exist, please login.");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
      phoneNmber,
    });
    if (!newUser) {
      throw createError(400, "user not created");
    }
    successResponse(res, {
      statusCode: 200,
      message: "registraion complited",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError(400, "all fields are required");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw createError(400, "user not found, please sign up.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw createError(400, "email or password not match");
    }
    const token = await createToken(
      { id: user._id, role: user.role, isActive: user.isActive },
      process.env.SECRET_KEY,
      "1d"
    );
    if (!token) {
      throw createError(400, "token not generated");
    }
    successResponse(res, {
      statusCode: 200,
      message: "login success",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};
