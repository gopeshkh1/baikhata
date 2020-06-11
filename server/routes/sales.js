const express = require("express");
const router = express.Router();

var rows = [
  {
    id: "ewtrhueiwd-gfndsjk-qdgdf",
    bill_no: "1",
    sales_type: "sell",
    date_of_purchase: "2020-10-05",
    dealer_name: "gopesh",
    products: [
      {
        id: "590456513-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
      {
        id: "59045613-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
    ],

    other_expenses: [
      {
        id: "wertew-were-wewer",
        expense_type: "palledari",
        expense_amt: 10,
      },
    ],
    total: 30000,
    amt_paid: 10000,
  },
  {
    id: "ghfdsjdwo-dfhjjjs-dfg",
    bill_no: "2",
    sales_type: "sell",
    date_of_purchase: "2020-10-05",
    dealer_name: "gopi",
    products: [
      {
        id: "590456513-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
      {
        id: "59045613-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
    ],

    other_expenses: [
      {
        id: "wertew-were-wewer",
        expense_type: "palledari",
        expense_amt: 10,
      },
    ],
    total: 30000,
    amt_paid: 10000,
  },
  {
    id: "hjdksf-dfgfhgfdf-gdf",
    bill_no: "3",
    sales_type: "buy",
    date_of_purchase: "2020-10-05",
    dealer_name: "dewansh",
    products: [
      {
        id: "590456513-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
      {
        id: "59045612-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
    ],

    other_expenses: [
      {
        id: "wertew-were-wewer",
        expense_type: "palledari",
        expense_amt: 10,
      },
    ],
    total: 30000,
    amt_paid: 10000,
  },
  {
    id: "sadfgtf-efddhgf-dfdfg",
    bill_no: "4",
    sales_type: "sell",
    date_of_purchase: "2020-10-05",
    dealer_name: "dev",
    products: [
      {
        id: "590456513-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
      {
        id: "590456512-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
    ],

    other_expenses: [
      {
        id: "wertew-were-wewer",
        expense_type: "palledari",
        expense_amt: 10,
      },
    ],
    total: 30000,
    amt_paid: 10000,
  },
  {
    id: "asdgfd-fgdfsagds-gfgfd",
    bill_no: "5",
    sales_type: "buy",
    date_of_purchase: "2020-10-05",
    dealer_name: "dewa",
    products: [
      {
        id: "590456513-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
      {
        id: "59045612-5-4359423",
        product_type: "khanda",
        product_name: "dabangg",
        quantity: 12,
        quintals: 14,
        rate: 2000,
      },
    ],

    other_expenses: [
      {
        id: "wertew-were-wewer",
        expense_type: "palledari",
        expense_amt: 10,
      },
    ],
    total: 30000,
    amt_paid: 10000,
  },
];

router.get("/fetchSaleData", (req, res) => {
  res.send(rows);
});

router.post("/addSaleInfo", (req, res) => {
  let values = req.body;
  rows = [...rows, values];
  res.send(values);
});

router.put("/editEntry", (req, res) => {
  let payload = req.body;

  rows = [
    ...rows.map((row) => {
      const { colId, subColId, rowId, subRowId, newValue } = payload;
      if (row.id === rowId) {
        const newRow = { ...row };
        if (subColId !== null) {
          newRow[colId] = newRow[colId].map((subrow) =>
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
    }),
  ];
  res.send({ status: "success" });
});

module.exports = router;
