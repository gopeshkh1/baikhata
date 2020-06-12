const express = require("express");
const router = express.Router();

var rows = [
  {
    id: 23245454,
    sales_type: "sell",
    bill_no: "1234",
    date_of_purchase: "2020-06-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: "59d5c948-3aee-4d5c-9182-c2a54d68a1bc",
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100,
      },
    ],
    other_expenses: [
      {
        id: "a1db42da-7a4e-41ae-ad80-2a74f15a377b",
        expense_type: "Dalali",
        expense_amt: 100,
      },
    ],
    amt_paid: [
      {
        id: "8ff79035-a0e3-4f79-820b-1d33740e5753",
        amount: 0,
        payment_mode: "",
        details: "",
      },
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery",
  },
  {
    id: 1232435,
    sales_type: "sell",
    bill_no: "1235",
    date_of_purchase: "2020-06-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: "59d5c948-3aee-4d5c-9182-c2a54d68a1bd",
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100,
      },
      {
        id: "59d5c948-3aee-4d5c-9182-c2a54d68a1be",
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100,
      },
    ],
    other_expenses: [
      {
        id: "a1db42da-7a4e-41ae-ad80-2a74f15a377c",
        expense_type: "Dalali",
        expense_amt: 100,
      },
    ],
    amt_paid: [
      {
        id: "8ff79035-a0e3-4f79-820b-1d33740e5754",
        amount: 0,
        payment_mode: "",
        details: "",
      },
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery",
  },
  {
    id: 1323534,
    sales_type: "sell",
    bill_no: "1236",
    date_of_purchase: "2020-06-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: "59d5c948-3aee-4d5c-9182-c2a54d68a1be",
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100,
      },
    ],
    other_expenses: [
      {
        id: "a1db42da-7a4e-41ae-ad80-2a74f15a377bf",
        expense_type: "Dalali",
        expense_amt: 100,
      },
    ],
    amt_paid: [
      {
        id: "8ff79035-a0e3-4f79-820b-1d33740e5753q",
        amount: 0,
        payment_mode: "",
        details: "",
      },
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery",
  },
  {
    id: 2356758,
    sales_type: "sell",
    bill_no: "1237",
    date_of_purchase: "2020-06-12",
    dalal_name: "titu",
    dealer_name: "meena",
    products: [
      {
        id: "59d5c948-3aee-4d5c-9182-c2a54d68a1bc1",
        product_type: "khanda",
        product_name: "rajnigandha",
        marka: 30,
        quantity: 10,
        quintals: 100,
        rate: 2100,
      },
    ],
    other_expenses: [
      {
        id: "a1db42da-7a4e-41ae-ad80-2a74f15a377be",
        expense_type: "Dalali",
        expense_amt: 100,
      },
    ],
    amt_paid: [
      {
        id: "8ff79035-a0e3-4f79-820b-1d33740e57537",
        amount: 0,
        payment_mode: "",
        details: "",
      },
    ],
    total: 30000,
    remarks: "add 5000 extra on recovery",
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
