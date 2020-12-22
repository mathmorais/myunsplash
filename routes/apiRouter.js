const express = require("express");
const Router = express.Router();
const {
  addUser,
  addImage,
  getUser,
  deleteImage,
  findByLabel,
} = require("../Controller/UserController");

Router.post("/add/user", addUser);
Router.post("/add/image", addImage);
Router.post("/get", getUser);
Router.post("/find", findByLabel);

Router.delete("/delete", deleteImage);

module.exports = Router;
