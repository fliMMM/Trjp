const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const eventRoute = require("./routes/event");
const emailRoute = require("./routes/email");
const blogRoute = require("./routes/blog");
const cityRoute = require("./routes/city");
const placeRoute = require("./routes/place");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connect to db");
  })
  .catch((e) => {
    console.log("connect to db faile");
  });

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/place", placeRoute);

app.listen(process.env.PORT || 5555, () => {
  console.log("server is running at ", process.env.PORT || 5555);
});
