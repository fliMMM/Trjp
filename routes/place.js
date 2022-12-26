const express = require("express");
const Router = express.Router();
const PlaceSchema = require("../model/place");
const CitySchema = require("../model/city");
const axios = require("axios");
const place = require("../model/place");

Router.post("/create", async (req, res) => {
  const data = req.body;
  const defaultData = {
    type: data.type,
    cityName: data.cityName,
    cityId: data.cityId,
  };

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

Router.post("/update", async (req, res) => {
  const id = req.body.id;
  const needUpdate = req.body.needUpdate;
  console.log(needUpdate);

  try {
    const place = await PlaceSchema.findByIdAndUpdate(id, needUpdate);
    return res.status(200).json({
      success: true,
      message: "thành công",
      data: place,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "lay danh sach dia diem không thành công",
    });
  }
});

// get place by cityId and type
Router.post("/get-place", async (req, res) => {
  const cityId = req.body.cityId;
  const type = req.body.type;

  try {
    const places = await PlaceSchema.find({ cityId, type });
    return res.status(200).json({
      success: true,
      message: "thành công",
      data: places.slice(0, 10),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "lay danh sach dia diem không thành công",
    });
  }
});

//get place by id
Router.post("/get-place-by-id", async (req, res) => {
  const id = req.body.id;

  try {
    const place = await PlaceSchema.findById(id)
    return res.status(200).json({
      success: true,
      message: "thành công",
      data: place,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "lay  dia diem không thành công",
    });
  }
});

Router.post("/", async (req, res) => {
  const word = req.body.search;
  try {
    const cities = await CitySchema.find({});
    const places = await PlaceSchema.find({});
    const citiesResult = cities.filter((e) =>
      e?.title?.toLowerCase().includes(word)
    );
    const placesResult = places.filter((e) => {
      return (
        e?.type === "entertainment" && e?.name?.toLowerCase().includes(word)
      );
    });
    return res.status(200).json({
      message: " thanh cong",
      success: true,
      data: [...citiesResult, ...placesResult],
    });
  } catch (err) {
    console.log(err);
  }
});

Router.post("/buy-ticket", async (req, res) => {
  const data = req.body;
  try {
    const boughtTicket = await PlaceSchema.findByIdAndUpdate(data.placeId,{$push:{tickets:data.userId}})
    return res.status(200).json({
      message: " thanh cong",
      success: true,
      data: boughtTicket,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
