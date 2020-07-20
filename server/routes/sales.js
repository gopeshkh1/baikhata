const express = require("express");
const router = express.Router();
const pool = require("../dbConn/db_pool");
const dbTables = require("../dbConn/dbTables");
const fs = require("fs");
const path = require("path");

const { fetchSaleData, addSalesEntry } = require("../functions/sales");
var rows = [
  {
    id: "159526742775",
    sales_type: "sell",
    bill_no: "1234",
    date_of_purchase: "2020-07-20",
    dalal_name: "jeff",
    dealer_name: "joe",
    products: [
      {
        id: 1595267342930,
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 10.3,
        rate: 100
      }
    ],
    total_product_quantity: 10.3,
    net_products_value: 1030,
    other_expenses: [
      {
        id: 1595267401801,
        expense_type: "dalali",
        expense_amt: 100
      }
    ],
    expenses_total: 1030,
    amt_paid: [],
    total: 2060,
    remarks: "discount of 5%"
  }
];

// addSalesEntry(rows[0]);

router.get("/fetchSaleData", async (req, res) => {
  const result = await fetchSaleData();
  res.send(result);
});

router.post("/addSaleInfo", async (req, res) => {
  var values = req.body;
  try {
    await addSalesEntry(values);
    res.send({ message: "success" });
  } catch (err) {
    res.send({ message: "error" + err });
  }
  // addDayWiseStocks(values);
});

// router.put("/editEntry", (req, res) => {
//   let payload = req.body;
//
//   rows = [
//     ...rows.map(row => {
//       const { colId, subColId, rowId, subRowId, newValue } = payload;
//       if (row.id === rowId) {
//         const newRow = { ...row };
//         if (subColId !== null) {
//           newRow[colId] = newRow[colId].map(subrow =>
//             subrow.id === subRowId
//               ? { ...subrow, [subColId]: newValue }
//               : subrow
//           );
//         } else {
//           newRow[colId] = newValue;
//         }
//         console.log(newRow);
//         return newRow;
//       }
//       return row;
//     })
//   ];
//   res.send({ status: "success" });
// });

module.exports = router;
