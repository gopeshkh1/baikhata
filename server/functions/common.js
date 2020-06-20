const fs = require("fs");
const path = require("path");

const jsonReader = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        if (err.code === "ENOENT") resolve({});
        reject(err);
      }
      try {
        const object = JSON.parse(fileData);
        resolve(object);
      } catch (err) {
        resolve({});
      }
    });
  });

const jsonWriter = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, "\t"), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getTodayDate = () => {
  var [mm, dd, yy] = new Date()
    .toLocaleDateString()
    .split("/")
    .map(value => (value.length === 1 ? `0${value}` : value));
  return [yy, mm, dd];
};

module.exports = { getTodayDate, jsonWriter, jsonReader, daysInMonth };
