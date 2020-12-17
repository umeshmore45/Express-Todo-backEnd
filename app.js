const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const { router } = require("./router/userRouter");
const { taskRouter } = require("./router/taskrouter");
const { protectRoute } = require("./middleware/protectRoute");
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/users", router);
    app.use("/task", taskRouter);
    app.use(express.urlencoded({ extended: true }));

    app.listen(process.env.PORT, () => {
      console.log(`On Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log(err.message);
    return err;
  });
