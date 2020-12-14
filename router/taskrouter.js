const express = require("express");
const {
  createTask,
  readTask,
  findById,
  updateById,
  deleteById,
} = require("../controller/taskcontroller");

const taskRouter = express.Router();

taskRouter.route("/").post(createTask).get(readTask);
taskRouter.route("/:id").get(findById).patch(updateById).delete(deleteById);

module.exports.taskRouter = taskRouter;
