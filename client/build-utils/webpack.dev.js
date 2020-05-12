const Dotenv = require("dotenv-webpack");
const path = require("path");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, ".env.development"),
    }),
  ],
};
