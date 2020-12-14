const mongoose = require("mongoose");
const uniqid = require("uniqid");

const taskSchema = new mongoose.Schema({
  taskID: {
    type: String,
    default: uniqid(),
  },
  taskName: {
    type: String,
  },
  taskStatus: {
    type: String,
    default: "Not started",
    enum: ["Not started", "In Progress", "completed"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  startedAt: {
    type: Date,
  },

  completedAt: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports.Task = Task;
