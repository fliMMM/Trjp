const express = require("express");
const Router = express.Router();
const EventSchema = require("../model/event");

Router.post("/create", async (req, res) => {
  const data = req.body;

  try {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Tạo sự kiện không thành công",
      });
    }
    const newEvent = new EventSchema(data);
    await newEvent.save();
    return res.status(200).json({
      success: true,
      message: "Tạo sự kiện thành công",
      event: newEvent,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Tạo sự kiện không thành công",
      event: newEvent,
    });
  }
});



//get post by id

Router.post("/get-post", async (req, res) => {
  const postId = req.body.postId;

  try {
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: true,
        message: "Không tìm thấy bài đăng tuyển dụng này",
      });
    }

    return res.status(200).json({ success: true, post: post });
  } catch (err) {
    console.log(err);
  }
});

//lấy các post chưa được duyệt
Router.post("/get-my-post", async (req, res) => {
  const userId = req.body.userId;

  try {
    const _res = await PostSchema.find({ creatorId: userId });

    return res.status(200).json({ success: true, posts: _res });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
});

// cập nhật CV

Router.post("/add-cv", async (req, res) => {
  const Cv_Url = req.body.Cv_Url;
  const postId = req.body.postId;
  const sender = req.body.sender;
  try {
    const _res = await PostSchema.findByIdAndUpdate(postId, {
      $push: { Cv: { sender: sender, url: Cv_Url } },
    });

    res.status(200).json({ success: true, message: "Gửi CV thành công!" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: true, message: "Gửi CV không thành công!" });
  }
});

Router.post("/", async (req, res) => {
  const page = req.body.page;
  const num_per_page = req.body.num_per_page;
  try {
    const _res = await PostSchema.find();

    return res.status(200).json({
      success: true,
      data: _res
        .reverse()
        .slice((page - 1) * num_per_page, num_per_page * page),
      count: _res.length,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
});

//remove all
// Router.post("/remove", async (req, res) => {
//   try {
//     await PostSchema.remove();
//     return res.status(200).json("xóa thành công");
//   } catch (err) {
//     console.log(err);
//   }
// });
module.exports = Router;
