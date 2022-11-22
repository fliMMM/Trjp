const express = require("express");
const Router = express.Router();
const BlogSchema = require("../model/blog");

Router.post("/create", async (req, res) => {
  const data = req.body;

  try {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Tạo Blog không thành công",
      });
    }
    const newBlog = new BlogSchema(data);
    await newBlog.save();
    return res.status(200).json({
      success: true,
      message: "Tạo Blog thành công",
      blog: newBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Tạo Blog không thành công",
    });
  }
});
module.exports = Router;
