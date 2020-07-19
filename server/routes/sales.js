const express = require("express");
const router = express.Router();
const pool = require("../dbConn/db_pool");
const dbTables = require("../dbConn/dbTables");
const fs = require("fs");
const path = require("path");

const { fetchSaleData, addSalesEntry } = require("../functions/sales");
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
