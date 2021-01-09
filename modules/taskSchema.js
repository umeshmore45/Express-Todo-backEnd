const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskID: {
    type: String,
    required: [true],
  },
  taskName: {
    type: String,
    required: [true, "Please Entre A task"],
  },
  taskStatus: {
    type: String,
    default: "Not Started",
    enum: ["Not Started", "In Progress", "Completed"],
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
