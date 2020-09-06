const express = require("express");
const fs = require("fs");
const path = require("path");

const { jsonReader, getTodayDate } = require("../functions/common");

const router = express.Router();

router.get("/getMonthlyStocks/:year/:month", async (req, res) => {
  const { month, year } = req.params;
  const filePath = path.join(
    __dirname,
    `../DayWiseStocks/${year}/${month}.json`
  );
  const result = await jsonReader(filePath);
  console.log(result);
  res.send(result);
});

router.get("/getRecentStock", async (req, res) => {
  const [yy, mm, dd] = getTodayDate();
  const filePath = path.join(__dirname, `../DayWiseStocks/${yy}/${mm}.json`);
  let result = await jsonReader(filePath);
  Object.keys(result).map(key => {
    result[key] = result[key][dd];
  });
  console.log(result);
  res.send(result);
});
// checkFileExists(new Date());
module.exports = router;
