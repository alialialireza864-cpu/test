const validation = require("../validation/register");
const express = require("express");
const { isValidObjectId } = require("mongoose");
const userModel = require("../models/Users");
exports.getUser = async (req, res) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    try {
      const user = await userModel.find({ _id: id });
      console.log(user);

      if (user.length === 0) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "can not get user from data base" });
    }
  } else {
    res.status(422).json({ message: "invalid user id!" });
  }
};
exports.register = async (req, res) => {
  const validationRes = validation(req.body);
  if (validationRes !== true) {
    res.status(422).json(validationRes);
    return;
  } else {
    try {
      const { name, userName, email, password } = req.body;
      const user = await userModel.create({ name, userName, email, password });
      res.status(201).json({ message: "user created successfully!", user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "error creating user", error: err.message });
    }
  }
};
exports.remove = async (req, res) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const deleteResult = await userModel.findByIdAndDelete({ _id: id });
    if (!deleteResult) {
      res.status(404).json({ message: "user not found" });
      return;
    } else {
      res.status(200).json({ message: "user deleted successfully!" });
      return;
    }
  } else {
    res.status(422).json({ message: "user id is not valid" });
    return;
  }
};
exports.getAll = async (req, res) => {
  try {
    const users = await userModel.find({}).lean();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "can not get users from data base" });
  }
};
