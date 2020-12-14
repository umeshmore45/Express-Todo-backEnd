const { Task } = require("../modules/taskSchema");

const createTask = (req, res, next) => {
  try {
    let newTask = new Task({
      taskName: req.body.taskName,
    });
    newTask.save().then((data) => {
      console.log(data);
    });
  } catch (err) {
    return console.log(err);
  }
};

const readTask = async (req, res, next) => {
  try {
    const task = await Task.find().select(
      "taskName  taskStatus createdAt -_id"
    );
    console.log(task);
    res.send(task);
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

    console.log(task);
    res.send(task);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateById = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { taskStatus: "In progress" }
    );
    console.log(task);
    res.send(task);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteById = async (req, res, next) => {
  try {
    const task = await Task.findOneAndRemove({ _id: req.params.id });
    console.log("Successfully Deleted");
    res.send("Successfully Deleted");
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
