const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();

const { updateStocksOnStart } = require("./functions/stocks");
updateStocksOnStart();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.end("hello from backend");
});

const sales = require("./routes/sales");
app.use("/api/sales", sales);

const stocks = require("./routes/stocks");
app.use("/api/stocks", stocks);

// app.use(express.static("client/dist"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../", "client", "dist", "index.html"));
// });

const port = process.env.PORT || 8000;
app.listen(port, "0.0.0.0", (err, res) => {
  if (err) {
    console.log("some error occured while starting the server");
  } else {
    console.log(`server started at port:${port}`);
  }
});
