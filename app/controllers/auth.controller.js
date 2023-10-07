const AppError = require("../../utills/appError");
const catchAsync = require("../../utills/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDetails = require("../db-setup/db.config");

exports.createUser = catchAsync(async (req, res, next) => {
  const existingUser = await userDetails.usersDetailsModel.findOne({
    email: req.body.email,
  });
  console.log(req.body.email, "req.body.email", existingUser);

  if (existingUser) {
    return next(new AppError("Email already exist!", 404));
  } else {
    console.log("hello new User");

    const password = await bcrypt.hash(req.body.password, 8);
    const createUserData = await userDetails.usersDetailsModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: password,
    });
    if (createUserData) {
      return res.send({
        object: "user",
        data: createUserData,
        message: "User created",
      });
    } else {
      return next(new AppError("User not created", 404));
    }
  }
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const existingUser = await userDetails.usersDetailsModel.findOne({
    email: req.body.email,
  });
  if (existingUser) {
    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (isMatch) {
      const token = jwt.sign({ id: existingUser.id }, "secret", {
        expiresIn: "12hr",
      });
      return res.send({
        object: "user",
        data: { existingUser, token: token },
        message: "User Logined successfully!",
      });
    } else {
      return next(new AppError("Password is incorrect!", 404));
    }
  } else {
    return next(
      new AppError("Email does not exist. Please Register an account!", 404)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userDetails.usersDetailsModel.findOne({ _id: userId });
  if (user) {
    const newPassword = req.body.password;
    const password = await bcrypt.hash(newPassword, 8);
    console.log(password, "password");
    const updatePassword =
      await userDetails.usersDetailsModel.findByIdAndUpdate(
        userId,
        { password },
        { new: true, runValidators: true }
      );
    if (!updatePassword) {
      return next(new AppError("User not found", 404));
    }

    return res.send({
      object: "updatePassword",
      data: { updatePassword },
      message: "Password Updated successfully!",
    });
  } else {
    return next(new AppError("User doesn't exist", 404));
  }
});
