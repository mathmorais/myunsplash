require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const path = require("path");
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "client/src")));

app.use("/api", express.json(), apiRouter);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
