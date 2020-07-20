const fs = require("fs");
const path = require("path");

const {
  getTodayDate,
  jsonWriter,
  jsonReader,
  daysInMonth
} = require("./common");

const STOCKSFOLDERPATH = path.join(__dirname, "../DayWiseStocks");
const FILEFORLASTUPDATE = path.join(STOCKSFOLDERPATH, "lastUpdated");

var loaded = {};
var lockProducts = {};
var fileLockTimeout = {};
var fileData = {};
var locks = {};

const updateStocksOnStart = async () => {
  const lastUpdatefilePath = FILEFORLASTUPDATE;
  const todayDate = getTodayDate().join("-");
  if (!fs.existsSync(STOCKSFOLDERPATH)) {
    const { fetchSaleData } = require("./sales");
    const values = await fetchSaleData();
    console.log(JSON.stringify(values, null, "\t"));
    await Promise.all(values.map(async value => await addDayWiseStocks(value)));
    fs.writeFile(lastUpdatefilePath, todayDate, () => {
      console.log("updated data");
    });
    return;
  }

  fs.readFile(lastUpdatefilePath, "utf-8", async (err, lastUpdated) => {
    if ((err && err.code === "ENOENT") || todayDate === lastUpdated) {
      return;
    }

    const [yy, mm, dd] = lastUpdated.split("-");

    const dirpath = getDirPath(lastUpdated);
    const filePath = getFilePath(lastUpdated);
    await loadFileData(lastUpdated);

    for (var datakey in fileData[filePath]) {
      await iterateData(
        datakey,
        lastUpdated,
        fileData[filePath][datakey][parseInt(dd)]
      );
    }

    fs.writeFile(lastUpdatefilePath, todayDate, () => {
      console.log("updated data");
    });
  });
};

const addLock = filePath => {
  locks[filePath] = true;
};

const rmFileFromLck = filePath => {
  delete lockProducts[filePath];
};

const addDayWiseStocks = async ({ date_of_purchase, products, sales_type }) => {
  const filePath = getFilePath(date_of_purchase);
  await loadFileData(date_of_purchase);
  await addLockProducts(filePath, date_of_purchase, products, sales_type);

  await jsonWriter(filePath, fileData[filePath]);
  rmFileFromLck(filePath);
};

const addLockProducts = (filePath, date_of_purchase, products, sales_type) => {
  const [yy, mm, dd] = date_of_purchase.split("-");
  if (!(filePath in lockProducts)) {
    lockProducts[filePath] = [];
  }
  lockProducts[filePath] = [...lockProducts[filePath], { products, dd }];

  lockProducts[filePath].forEach(({ products, dd }) =>
    products.forEach(async product => {
      var { product_name, rate, quintals } = product;
      const datakey = `${product_name}+++${rate}`;

      fileData[filePath][datakey] =
        datakey in fileData[filePath] ? fileData[filePath][datakey] : {};

      var newValue = 0;
      if (sales_type === "buy")
        newValue =
          dd in fileData[filePath][datakey]
            ? fileData[filePath][datakey][dd] + quintals
            : quintals;
      else {
        newValue =
          dd in fileData[filePath][datakey]
            ? fileData[filePath][datakey][dd] - quintals
            : -quintals;
      }
      await iterateData(datakey, date_of_purchase, newValue);
    })
  );
};

const getFilePath = date_of_purchase => {
  const [yy, mm, dd] = date_of_purchase.split("-");
  const dirpath = path.join(STOCKSFOLDERPATH, `${yy}`);
  const filePath = path.join(dirpath, `${mm}.json`);
  return filePath;
};

const getDirPath = date_of_purchase => {
  const [yy, mm, dd] = date_of_purchase.split("-");
  const dirpath = path.join(STOCKSFOLDERPATH, `${yy}`);
  return dirpath;
};

const iterateData = async (datakey, startDate, value) => {
  const [yy, mm, dd] = startDate.split("-");
  const filePath = getFilePath(startDate);

  const [tyy, tmm, tdd] = getTodayDate();
  var recurse = tyy > yy || tmm > mm;
  var endDate = recurse ? daysInMonth(yy, mm) : tdd;

  await loadFileData(startDate);
  var data = {};
  for (var i = parseInt(dd); i <= endDate; i++) {
    data[i] = value;
  }
  fileData[filePath][datakey] = { ...fileData[filePath][datakey], ...data };

  var recurseFunction = () => {};
  if (recurse) {
    const newValue = parseInt(mm) + 1;
    var newmm = `${newValue % 12}`;
    newmm = newmm.length === 1 ? `0${newmm}` : newmm;
    const newyy = `${parseInt(yy) + Math.floor(newValue / 12)}`;
    const newDate = `${newyy}-${newmm}-01`;

    recurseFunction = iterateData.bind(this, datakey, newDate, value);
  }

  await Promise.all([
    jsonWriter(filePath, fileData[filePath]),
    recurseFunction()
  ]);
};

const loadFileData = async date => {
  const filePath = getFilePath(date);
  if (!loaded[filePath] && !locks[filePath]) {
    addLock(filePath);
    const dirpath = getDirPath(date);
    await fs.promises.mkdir(dirpath, { recursive: true });
    try {
      fileData[filePath] = await jsonReader(filePath);
      loaded[filePath] = true;
      if (filePath in fileLockTimeout) {
        delete fileLockTimeout[filePath];
      }
    } catch (err) {
      throw err;
    }
  } else if (!loaded[filePath] && locks[filePath]) {
    if (!(filePath in fileLockTimeout)) {
      fileLockTimeout[filePath] = {};
      fileLockTimeout[filePath]["promise"] = new Promise(resolve => {
        return setTimeout(resolve, 50);
      });
    }
    await fileLockTimeout[filePath]["promise"];
  }
};

module.exports = { addDayWiseStocks, updateStocksOnStart };
