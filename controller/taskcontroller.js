const { AppError } = require("../helper/Errorclass");
const { sendErrorMessage } = require("../helper/sendError");
const { Task } = require("../modules/taskSchema");
const uniqid = require("uniqid");

const createTask = (req, res, next) => {
  try {
    let newTask = new Task({
      taskName: req.body.taskName,
      taskID: uniqid(),
    });
    newTask
      .save()
      .then((data) => {
        console.log(data);
        res.json({
          id: data._id,
          taskName: data.taskName,
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readTask = async (req, res, next) => {
  try {
    const tasknw = req.query.select;

    if (tasknw) {
      const task = await Task.find().select(`${tasknw} taskID createdAt -_id`);
      console.log(task);
      return res.send(task);
    } else {
      const task = await Task.find(req.query).select(
        `taskName taskStatus taskID createdAt -_id`
      );
      res.send(task);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findById = async (req, res, next) => {
  try {
    const task = await Task.find({ _id: req.params.id }).select(
      "taskName  taskStatus createdAt -_id"
    );

    if (task) {
      console.log(task);
      return res.send(task);
    } else {
      return sendErrorMessage(
        new AppError(404, "UnSuccessful", "Entre Valid Id"),
        req,
        res
      );
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateById = async (req, res, next) => {
  try {
    console.log(req.body.taskStatus);
    if (req.body.taskStatus.trim() === "") {
      return sendErrorMessage(
        new AppError(406, "unSuccessful", "Enter Valid Input"),
        req,
        res
      );
    } else {
      const task = await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { taskStatus: req.body.taskStatus },
        { runValidators: true, new: true }
      );
      console.log(await task);
      res.send(await task);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteById = async (req, res, next) => {
  try {
    const task = await Task.findOneAndRemove({ taskID: req.params.id });
    console.log("Successfully Deleted");
    res.send(task);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.createTask = createTask;
module.exports.readTask = readTask;
module.exports.findById = findById;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;
