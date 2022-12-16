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

Router.post("/", async (req, res) => {
  const word = req.body.search;
  try {
    const cities = await CitySchema.find({});
    const searchResult = cities.filter((e) =>
      e.title.toLowerCase().includes(word)
    );
    console.log(searchResult);
    return res.status(200).json({
      message: " thanh cong",
      success: true,
      data: searchResult,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = Router;
