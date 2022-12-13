const express = require("express");
const Router = express.Router();
const PlaceSchema = require("../model/place");
const axios = require("axios");

Router.post("/create", async (req, res) => {
  const data = req.body;
  const defaultData = {
    type: data.type,
    cityName: data.cityName,
    cityId: data.cityId
  }

  try {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "không thành công",
      });
    }
    const res1 = await axios.get(data.apiUrl, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const needData = res1.data?.features;
    const places = needData.map((item) => {
      const props = item.properties;
      return {
        ...defaultData,
        name: props?.name,
        addressLine1: props?.address_line1,
        addressLine2: props?.address_line2,
        coordinates: item?.geometry.coordinates,
      };
    });
    const records = await PlaceSchema.insertMany(places);
    // const newCity = new CitySchema(data);
    // await newCity.save();
    return res.status(200).json({
      success: true,
      message: "thành công",
      data: records,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Tạo Blog không thành công",
    });
  }
});

Router.post("/get-place", async (req, res) => {
  const cityId = req.body.cityId;
  const type = req.body.type;

  try {
    const places = await PlaceSchema.find({ cityId, type });
    return res.status(200).json({
      success: true,
      message: "thành công",
      data: places.slice(0,10),
    });
    
  } catch (err) {
    console.log(err);
     return res.status(400).json({
      success: false,
      message: "lay danh sach dia diem không thành công",
    });
  }
})
module.exports = Router;
