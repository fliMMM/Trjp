const express = require("express");
const Router = express.Router();
const UserSchema = require("../model/user");

Router.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const user = await UserSchema.findOne(data);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Đăng nhập không thành công" });
    }

    //console.log(user);

    return res
      .status(200)
      .json({ success: true, message: "Đăng nhập thành công", user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Đăng nhập không thành công!" });
  }
});

Router.post("/register", async (req, res) => {
  const data = req.body;
  if (data.password !== data.confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Đăng kí không thành công" });
  }
  try {
    const user = await UserSchema.findOne({ phone: data.phone });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }

    const { confirmPassword, ..._data } = data;
    const newUser = new UserSchema(_data);
    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Đăng kí thành công", user:newUser });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Đăng nhập không thành công!" });
  }
});

module.exports = Router;
