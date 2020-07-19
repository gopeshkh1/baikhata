const express = require("express");
const router = express.Router();
const pool = require("../dbConn/db_pool");
const dbTables = require("../dbConn/dbTables");
const fs = require("fs");
const path = require("path");

//feches sales data from the database a return it in json format
const fetchSaleData = async () => {
  var [sales, products, other_expenses, amt_paid] = await Promise.all([
    pool.query("select * from sales_entry"),
    pool.query("select * from products_entry"),
    pool.query("select * from expenses_entry"),
    pool.query("select * from amt_paid")
  ]);

  sales = sales.map(sale => ({
    ...sale,
    ["products"]: [],
    ["other_expenses"]: [],
    ["amt_paid"]: []
  }));
  products.forEach(({ sales_id, ...args }) => {
    const [sale] = sales.filter(sale => sale.id === sales_id);
    sale["products"] = [...sale["products"], { ...args }];
  });
  other_expenses.forEach(({ sales_id, ...args }) => {
    const [sale] = sales.filter(sale => sale.id === sales_id);
    sale.other_expenses = [...sale.other_expenses, { ...args }];
  });
  amt_paid.forEach(({ sales_id, ...args }) => {
    const [sale] = sales.filter(sale => sale.id === sales_id);
    sale.amt_paid = [...sale.amt_paid, { ...args }];
  });
  return sales;
  // console.log(JSON.stringify(sales, null, 1));
};

// add sales entry to the database and updates in the stock entry.
const addSalesEntry = async values => {
  const connection = await pool.getTransactionalConn();
  connection.beginTransaction();
  try {
    await addSalesEntryToDb(connection, values);
    await addDayWiseStocks(values);
    await connection.commit();
    console.log("committed..");
  } catch (err) {
    console.error(err);
    connection.rollback();
  } finally {
    console.log("completed");
    return;
  }
};

//add the sales entry to the database
const addSalesEntryToDb = async (connection, values) => {
  var { products, other_expenses, amt_paid, id: sales_id } = values;

  await Promise.all([
    insertIntoDB(connection, "sales", [values], sales_id),
    insertIntoDB(connection, "products", products, sales_id),
    insertIntoDB(connection, "other_expenses", other_expenses, sales_id),
    insertIntoDB(connection, "amt_paid", amt_paid, sales_id)
  ]);
};

// insering the data to the database by their table type
const insertIntoDB = async (connection, type, values, sales_id) => {
  const table = dbTables[type];

  var valuesToInsert = values.map(value => {
    const newValues = [];
    value["sales_id"] = sales_id;
    table.columns.forEach(key => {
      newValues.push(value[key]);
    });
    return newValues;
  });
  await connection.query(`insert  into ${table.tableName} values ?`, [
    valuesToInsert
  ]);
};

module.exports = { fetchSaleData, addSalesEntry };
