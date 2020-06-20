const express = require("express");
const router = express.Router();
const pool = require("../dbConn/db_pool");
const dbTables = require("../dbConn/dbTables");
const fs = require("fs");
const path = require("path");
const { addDayWiseStocks } = require("../functions/stocks");

var rows = [
  {
    id: 1232435,
    sales_type: "buy",
    bill_no: "1235",
    date_of_purchase: "2020-05-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: 5959483,
        product_type: "khanda",
        product_name: "rajnigandh",
        marka: 30,
        quantity: 10,
        quintals: 10,
        rate: 2100
      },
      {
        id: 3459182,
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100
      }
    ],
    other_expenses: [
      {
        id: 42744180,
        expense_type: "Dalali",
        expense_amt: 100
      }
    ],
    amt_paid: [
      {
        id: 903503479,
        amount: 0,
        payment_mode: "",
        details: ""
      }
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery"
  },
  {
    id: 1232436,
    sales_type: "buy",
    bill_no: "1235",
    date_of_purchase: "2020-05-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: 59594831,
        product_type: "khanda",
        product_name: "rajnigandh",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100
      },
      {
        id: 34591821,
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100
      }
    ],
    other_expenses: [
      {
        id: 427441801,
        expense_type: "Dalali",
        expense_amt: 100
      }
    ],
    amt_paid: [
      {
        id: 903503478,
        amount: 0,
        payment_mode: "",
        details: ""
      }
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery"
  },
  {
    id: 1232437,
    sales_type: "buy",
    bill_no: "1235",
    date_of_purchase: "2020-06-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: 59594832,
        product_type: "khanda",
        product_name: "rajnigandh",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100
      },
      {
        id: 34591822,
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100
      }
    ],
    other_expenses: [
      {
        id: 427441802,
        expense_type: "Dalali",
        expense_amt: 100
      }
    ],
    amt_paid: [
      {
        id: 903503477,
        amount: 0,
        payment_mode: "",
        details: ""
      }
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery"
  }
];

router.get("/fetchSaleData", async (req, res) => {
  const result = await fetchSaleData();
  res.send(result);
});

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
    // console.log("sale", sale);
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
  console.log(JSON.stringify(sales, null, 1));
};

fetchSaleData();

router.post("/addSaleInfo", (req, res) => {
  var values = req.body;
  addSalesEntry(values);
});

const addSalesEntry = async values => {
  var {
    products,
    other_expenses,
    amt_paid,
    id: sales_id,
    date_of_purchase,
    sales_type
  } = values;
  const connection = await pool.getTransactionalConn();
  connection.beginTransaction();
  try {
    await Promise.all([
      insertIntoDB(connection, "sales", [values], sales_id),
      insertIntoDB(connection, "products", products, sales_id),
      insertIntoDB(connection, "other_expenses", other_expenses, sales_id),
      insertIntoDB(connection, "amt_paid", amt_paid, sales_id)
    ]);
    await addDayWiseStocks(date_of_purchase, products, sales_type);
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

// addSalesEntry(rows[0]);
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

router.put("/editEntry", (req, res) => {
  let payload = req.body;

  rows = [
    ...rows.map(row => {
      const { colId, subColId, rowId, subRowId, newValue } = payload;
      if (row.id === rowId) {
        const newRow = { ...row };
        if (subColId !== null) {
          newRow[colId] = newRow[colId].map(subrow =>
            subrow.id === subRowId
              ? { ...subrow, [subColId]: newValue }
              : subrow
          );
        } else {
          newRow[colId] = newValue;
        }
        console.log(newRow);
        return newRow;
      }
      return row;
    })
  ];
  res.send({ status: "success" });
});

module.exports = router;
