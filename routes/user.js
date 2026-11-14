const express = require("express");
const userController = require("../controller/userController");

const userRouter = express.Router();
userRouter
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.remove);

userRouter.get("/",userController.getAll);
userRouter.post("/register", userController.register);
module.exports = userRouter;
