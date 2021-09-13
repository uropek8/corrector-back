require("dotenv").config();

const express = require("express");
const cors = require("cors");
const moment = require("moment");

const config = require("./config");
const calculationService = require("./services/calculation");

const getDocType = (mimetype) => {
  return mimetype.includes("other") ? false : true;
};

const getTimeInHour = (time) => {
  return Number((time / 60).toFixed());
};

const createApp = () => {
  const app = express();
  const router = express.Router();

  router.get("/", (req, res) => {
    res.body = "Response is ok";
    res.send(res.body);
  });

  router.post("/api", express.json(), (req, res) => {
    const { language, mimetype, count } = req.body;
    const type = getDocType(mimetype);
    const amount = calculationService.amounCalculate(language, count, type);
    const deadlineDuration = calculationService.deadlineDurationCalculate(language, count);
    const deadlineDate = calculationService.deadlineDateCalculate(new Date(), deadlineDuration);

    const resData = {
      price: amount,
      time: getTimeInHour(deadlineDuration),
      deadline: deadlineDate.getTime(),
      deadline_date: moment(deadlineDate).format("DD/MM/YY HH:mm"),
    };

    res.json(resData);
  });

  app.use(router);
  app.use(cors());

  return app;
};

if (!module.parent) {
  createApp().listen(config.server.port, () => {
    console.log(`Server listening at http://localhost:${config.server.port}`);
  });
}

module.exports = createApp;
