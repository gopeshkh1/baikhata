const express = require("express");
const fs = require("fs");
const path = require("path");

const { jsonReader } = require("../functions/common");

const router = express.Router();

router.get("/getStocks/:year/:month", async (req, res) => {
  const { month, year } = req.params;
  const filePath = path.join(
    __dirname,
    `../DayWiseStocks/${year}/${month}.json`
  );
  const result = await jsonReader(filePath);
  res.send(result);
});

checkFileExists(new Date());
module.exports = router;
