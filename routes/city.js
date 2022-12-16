const express = require("express");
const Router = express.Router();
const CitySchema = require("../model/city");

Router.post("/create", async (req, res) => {
  const data = req.body;

  try {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "không thành công",
      });
    }
    const newCity = new CitySchema(data);
    await newCity.save();
    return res.status(200).json({
      success: true,
      message: "thành công",
      city: newCity,
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
